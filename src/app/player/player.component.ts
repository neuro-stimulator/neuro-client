import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommandsService } from '../share/commands.service';
import { SerialService } from '../share/serial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IOEvent, SerialDataEvent, StimulatorStateEvent } from '../share/serial-data.event';
import { NGXLogger } from 'ngx-logger';
import { environment } from '../../environments/environment';
import { Options as SliderOptions } from 'ng5-slider/options';
import { Round } from './round';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent implements OnInit {

  private static readonly OUTPUT_COLORS = [
    'rgba(119,94,64,0.5)',
    'rgba(126,113,95,0.5)',
    'rgba(156,154,121,0.5)',
    'rgba(213,102,44,0.5)',
    'rgba(101,73,119,0.5)',
    'rgba(62,72,85,0.5)',
    'rgba(69,109,147,0.5)',
    'rgba(123,156,172,0.5)',
  ];

  private _experimentID: number;
  private _rounds = 0;
  private _processedRounds = -1;
  private _eventOffsetCounter = 0;
  eventOffsetIndex = 0;
  private _eventOffsetIndexArray = [];

  private events: IOEvent[] = [];

  @ViewChild('canvas', {static: false}) canvas: ElementRef;

  eventOffsetIndexOptions: SliderOptions = {
    floor: 1,
    ceil: 1,
    showTicks: true,
    showTicksValues: true,
    tickStep: 1,
    animate: false
  };

  constructor(private readonly _command: CommandsService,
              private readonly _serial: SerialService,
              private readonly _router: Router,
              private readonly _route: ActivatedRoute,
              private readonly logger: NGXLogger) {
  }

  private _handleRawData(event: SerialDataEvent) {
    switch (event.name) {
      case 'EventStimulatorState':
        this._handleStimulatorStateEvent(event as StimulatorStateEvent);
        break;
      case 'EventIOChange':
        this._handleIODataEvent(event as IOEvent);
        break;
    }
  }

  private _handleStimulatorStateEvent(event: StimulatorStateEvent) {
    switch (event.state) {
      case 0x01:
        for (let i = 0; i < environment.maxOutputCount; i++) {
          const e: IOEvent = {name: 'EventIOChange', ioType: 'output', state: 'off', index: i, timestamp: event.timestamp};
          this.events.push(e);
        }
        this._eventOffsetIndexArray.push(this._eventOffsetCounter);
        this._eventOffsetCounter += environment.maxOutputCount;
        break;
    }
  }

  private _handleIODataEvent(event: IOEvent) {
    this.events.push(event);
    if (event.ioType === 'output' && event.state === 'off' && event.index === 3) {
      this._rounds++;
      this._eventOffsetIndexArray.push(this._eventOffsetCounter);

      // shorturl.at/ijAFQ
      const newOptions: SliderOptions = Object.assign({}, this.eventOffsetIndexOptions);
      newOptions.ceil = Math.max(1, this._rounds);
      newOptions.showTicks = this._rounds < 15;
      newOptions.showTicksValues = this._rounds < 15;
      this.eventOffsetIndexOptions = newOptions;

    }
    this._eventOffsetCounter++;

    if (this._rounds === this._processedRounds) {
      return;
    }
    this._processedRounds++;
    this._renderExperimentProgress();
  }

  private _renderExperimentProgress() {
    const peakHeight = 20;
    const lineHeight = 30;
    const maxDelta = 30;
    const graphOffset = 30;
    const canvas = (this.canvas.nativeElement as HTMLCanvasElement);
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = (environment.maxOutputCount + 1) * lineHeight;
    const graphics = canvas.getContext('2d');
    const rounds: Round[] = [];

    graphics.clearRect(0, 0, canvas.width, canvas.height);

    graphics.beginPath();
    graphics.moveTo(0, 0);

    for (let i = 0; i < environment.maxOutputCount; i++) {
      const round: Round = {
        input: {event: null, x: graphOffset, y: lineHeight + (i * lineHeight)},
        output: {event: null, x: graphOffset, y: lineHeight + (i * lineHeight)},
      };
      graphics.fillStyle = PlayerComponent.OUTPUT_COLORS[i];
      graphics.fillRect(round.output.x - graphOffset, round.output.y - lineHeight, canvas.width, lineHeight);
      graphics.strokeStyle = 'black';
      graphics.strokeText(`${i + 1}.`, round.output.x - (graphOffset / 2), round.output.y - (lineHeight / 2) + 3);
      graphics.moveTo(round.output.x, round.output.y);
      graphics.strokeStyle = 'rgba(62,62,62,0.28)';
      graphics.lineTo(canvas.width, round.output.y);
      graphics.stroke();
      rounds.push(round);
    }

    graphics.stroke();
    graphics.closePath();
    graphics.moveTo(0, 0);

    let j = 1;
    for (let i = this._eventOffsetIndexArray[this.eventOffsetIndex]; i < this.events.length; i++) {
      const event = this.events[i];
      if (event.ioType === 'output') {
        // Pokud v pomocných datech na indexu nic není
        if (rounds[event.index].output.event === null) {
          // Tak event uložím
          rounds[event.index].output.event = event;
          if (event.state === 'on') {
            rounds[event.index].output.y -= peakHeight;
          }
          continue;
        }
      }

      const previousRound = rounds[event.index];
      const lastX = previousRound.output.x;
      const lastY = previousRound.output.y;
      let dynamicTimestampStart = this.events[event.index].timestamp;
      let delta = event.timestamp - dynamicTimestampStart;
      if (delta > maxDelta) {
        delta = maxDelta;
        dynamicTimestampStart = event.timestamp;
      }
      graphics.moveTo(lastX, lastY);
      let newX = lastX + delta;
      let newY = lastY;
      if (newX > (canvas.width - delta)) {
        this.eventOffsetIndex++;

        return;
      }

      graphics.strokeStyle = 'black';
      graphics.beginPath();

      // Na indexu se nachází nějaký event
      // Pokud se jedná o event výstupu
      if (event.ioType === 'output') {
        // Výstup se aktivoval
        if (event.state === 'on') {
          // Poslední event musí být deaktivace
          newX -= delta;
          graphics.moveTo(newX, newY);
          newY -= peakHeight;
          graphics.lineTo(newX, newY);

          graphics.stroke();
        } else { // Výstup se deaktivovat
          if (previousRound.output.event.state === 'on') {
            graphics.moveTo(lastX, lastY);
            graphics.lineTo(newX, newY);
            newY += peakHeight;
            graphics.lineTo(newX, newY);
            newX += delta;
            graphics.lineTo(newX, newY);
            graphics.stroke();
          } else {
            newX += delta;
            graphics.moveTo(lastX, lastY);
            graphics.lineTo(newX, newY);
            graphics.stroke();
          }
        }

        rounds[event.index].output.event = event;
        rounds[event.index].output.x = newX;
        rounds[event.index].output.y = newY;
      } else {
        graphics.strokeStyle = 'blue';
        let deltaY = 0;
        if (previousRound.output.event && previousRound.output.event.state === 'on') {
          deltaY = peakHeight;
        }
        newY += deltaY;
        graphics.moveTo(newX, newY);
        if (previousRound.output.event && previousRound.output.event.state === 'off') {
          deltaY = peakHeight;
        }
        newY -= deltaY;
        graphics.lineTo(newX, newY);
        graphics.stroke();

        rounds[event.index].input.event = event;
        rounds[event.index].input.x = newX;
        rounds[event.index].input.y = newY;
      }


      graphics.stroke();
      graphics.closePath();
      if (event.ioType === 'output' && event.state === 'off' && event.index === 0) {
        graphics.beginPath();
        graphics.strokeStyle = 'orange';
        graphics.moveTo(newX, 0);
        graphics.lineTo(newX, canvas.height);
        graphics.stroke();
        graphics.closePath();
        graphics.strokeStyle = 'black';

        const textX = (lastX + newX) / 2;
        graphics.strokeText(`${this.eventOffsetIndex + j}.`, textX, canvas.height - 10);
        j++;
      }
    }
  }

  ngOnInit() {
    if (this._route.snapshot.params['type'] === undefined ||
        this._route.snapshot.params['id'] === undefined) {
      this._router.navigate(['/experiments']);
    }

    // const type = this._route.snapshot.params['type'];
    this._experimentID = this._route.snapshot.params['id'];
    this._serial.rawData$.subscribe((event: SerialDataEvent) => this._handleRawData(event));
    setTimeout(() => {

    this._renderExperimentProgress();
    }, 1000);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this._renderExperimentProgress();
  }

  handleUploadExperiment() {
    this._command.experimentSetup(this._experimentID);
  }

  handleRunExperiment() {
    this._command.experimentStart();
  }

  handleStopExperiment() {
    this._command.experimentStop();
  }

  handleClearExperiment() {
    this._command.experimentClear();
  }

  get stimulatorOnline(): boolean {
    return this._serial.isSerialConnected;
  }

  handleOffsetIndexChange(offsetIndex: number) {
    this.eventOffsetIndex = offsetIndex - 1;
    this._renderExperimentProgress();
  }
}
