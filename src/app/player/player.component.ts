import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommandsService } from '../share/commands.service';
import { SerialService } from '../share/serial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IOEvent, SerialDataEvent, StimulatorStateEvent } from '../share/serial-data.event';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent implements OnInit {

  private _experimentID: number;
  private _rounds = 0;
  private _eventOffset = 0;
  public timestampStart = 125608628;

  private events: IOEvent[] = [
    {name: 'EventIOChange', ioType: 'output', state: 'off', index: 0, timestamp: 129501263},
    {name: 'EventIOChange', ioType: 'output', state: 'off', index: 1, timestamp: 129501281},
    {name: 'EventIOChange', ioType: 'output', state: 'off', index: 2, timestamp: 129501298},
    {name: 'EventIOChange', ioType: 'output', state: 'off', index: 3, timestamp: 129501316},
    {name: 'EventIOChange', ioType: 'output', state: 'on', index: 1, timestamp: 130501240},
    {name: 'EventIOChange', ioType: 'output', state: 'on', index: 2, timestamp: 130501259},
    {name: 'EventIOChange', ioType: 'output', state: 'on', index: 3, timestamp: 130501276},
    {name: 'EventIOChange', ioType: 'output', state: 'off', index: 0, timestamp: 132501315},
    {name: 'EventIOChange', ioType: 'output', state: 'off', index: 1, timestamp: 132501333},
    {name: 'EventIOChange', ioType: 'output', state: 'off', index: 2, timestamp: 132501350},
    {name: 'EventIOChange', ioType: 'output', state: 'off', index: 3, timestamp: 132501368},
    {name: 'EventIOChange', ioType: 'output', state: 'on', index: 0, timestamp: 133501240},
    {name: 'EventIOChange', ioType: 'output', state: 'on', index: 1, timestamp: 133501258},
    {name: 'EventIOChange', ioType: 'output', state: 'on', index: 2, timestamp: 133501276},
    {name: 'EventIOChange', ioType: 'output', state: 'off', index: 0, timestamp: 135501315},
    {name: 'EventIOChange', ioType: 'output', state: 'off', index: 1, timestamp: 135501332},
    {name: 'EventIOChange', ioType: 'output', state: 'off', index: 2, timestamp: 135501350},
    {name: 'EventIOChange', ioType: 'output', state: 'off', index: 3, timestamp: 135501368},
  ];

  @ViewChild('canvas', {static: false}) canvas: ElementRef;

  constructor(private readonly _command: CommandsService,
              private readonly _serial: SerialService,
              private readonly _router: Router,
              private readonly _route: ActivatedRoute,
              private readonly logger: NGXLogger) { }

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
        this.timestampStart = event.timestamp;
        break;
    }
  }

  private _handleIODataEvent(event: IOEvent) {
    this.events.push(event);
    if (event.ioType === 'output' && event.state === 'off' && event.index === 0) {
      this._rounds++;
      if ((this._rounds % 10) === 0) {
        this._eventOffset += 10;
      }
    }
    this._renderExperimentProgress();
  }

  private _renderExperimentProgress() {
    const canvas = (this.canvas.nativeElement as HTMLCanvasElement);
    const graphics = canvas.getContext('2d');
    const helpData: {event: any, x: number, y: number}[] = [];
    let dynamicTimestampStart = this.timestampStart;

    for (let i = 0; i < 8; i++) {
      helpData.push({event: null, x: 0, y: 30 + (i * 30)});
    }

    graphics.clearRect(0, 0, canvas.width, canvas.height);
    graphics.strokeStyle = 'black';
    graphics.beginPath();
    graphics.moveTo(0, 0);

    for (let i = this._eventOffset; i < this.events.length; i++) {
      const event = this.events[i];
      // Pokud v pomocných datech na indexu nic není
      if (helpData[event.index].event === null) {
        this.logger.trace(`V help datech na indexu ${event.index} nic není.`);
        // Tak event uložím
        helpData[event.index].event = event;
        continue;
      }

      const lastEvent = helpData[event.index];
      const lastX = lastEvent.x;
      const lastY = lastEvent.y;
      let delta = event.timestamp - dynamicTimestampStart;
      if (delta > 30) {
        delta = 30;
        dynamicTimestampStart = event.timestamp;
      }
      graphics.moveTo(lastX, lastY);
      const newX = lastX + delta;
      const newY = lastY;
      if (canvas.width < newX) {
        canvas.width = newX;
        this.logger.debug(`Rozšiřuji canvas na novou šířku: ${newX}`);
      }

      this.logger.trace(`Na indexu: ${event.index} se nachází nějaký event.`);
      // Na indexu se nachází nějaký event
      // Pokud se jedná o event výstupu
      if (event.ioType === 'output') {
        // Výstup se aktivoval
        if (event.state === 'on') {
          this.logger.trace('output on');
          // Poslední event musí být deaktivace

          graphics.strokeStyle = 'blue';
          graphics.lineTo(newX, newY);
          graphics.stroke();
        } else { // Výstup se deaktivovat
          this.logger.trace('output off');
          graphics.strokeStyle = 'red';
          graphics.lineTo(newX, newY);
          graphics.stroke();
        }
      }


      graphics.strokeStyle = 'black';
      helpData[event.index].event = event;
      helpData[event.index].x = newX;
      helpData[event.index].y = newY;

      // if (event.state === 'off') {
      //   helpData[event.index]['output'] = event;
      //   continue;
      // }
      // const multiplier = event.timestamp - this.timestampStart;

    }
    graphics.stroke();
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
}
