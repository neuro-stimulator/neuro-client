import { Component, EventEmitter, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';

import { IOEvent, SerialDataEvent, StimulatorStateEvent } from '../share/serial-data.event';

import { CommandsService } from '../share/commands.service';
import { SerialService } from '../share/serial.service';
import { ExperimentsService } from '../experiments/experiments.service';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent implements OnInit {

  private _experimentID: number;

  private _eventEmitter: EventEmitter<IOEvent> = new EventEmitter<IOEvent>();
  eventEmitter: Observable<IOEvent> = this._eventEmitter.asObservable();
  outputCount = 4;

  constructor(private readonly _command: CommandsService,
              private readonly _serial: SerialService,
              private readonly _service: ExperimentsService,
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
        this._eventEmitter.next(event as IOEvent);
        break;
    }
  }

  private _handleStimulatorStateEvent(event: StimulatorStateEvent) {
    switch (event.state) {
      case 0x01:
        for (let i = 0; i < this.outputCount; i++) {
          const e: IOEvent = {name: 'EventIOChange', ioType: 'output', state: 'off', index: i, timestamp: event.timestamp};
          this._eventEmitter.next(e);
        }
        break;
    }
  }

  ngOnInit() {
    if (this._route.snapshot.params['type'] === undefined ||
        this._route.snapshot.params['id'] === undefined) {
      this._router.navigate(['/experiments']);
    }

    this._experimentID = this._route.snapshot.params['id'];
    this._service.one(this._experimentID).then(experiment => {
      this.outputCount = experiment.outputCount;
    });
    this._serial.rawData$.subscribe((event: SerialDataEvent) => this._handleRawData(event));
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
