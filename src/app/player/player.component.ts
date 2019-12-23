import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';

import { IOEvent, SerialDataEvent, StimulatorStateEvent } from '../share/serial-data.event';
import { CommandsService } from '../share/commands.service';
import { SerialService } from '../share/serial.service';
import { ExperimentsService } from '../experiments/experiments.service';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent implements OnInit, OnDestroy {

  private _experimentID: number;
  private _serialRawDataSubscription: Subscription;

  private _eventEmitter: EventEmitter<IOEvent> = new EventEmitter<IOEvent>();
  eventEmitter: Observable<IOEvent> = this._eventEmitter.asObservable();
  outputCount = 4;

  constructor(private readonly _command: CommandsService,
              private readonly _serial: SerialService,
              private readonly _service: ExperimentsService,
              private readonly _router: Router,
              private readonly _route: ActivatedRoute,
              private readonly logger: NGXLogger,
              private readonly toaster: ToastrService) {
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
      // Experiment byl ukončen
      case 0x00:
        this.toaster.success('Experiment byl ukončen.');
        this._router.navigate(['/results']);
        break;
      // Experiment byl spuštěn
      case 0x01:
        this.toaster.success('Experiment byl spuštěn.');
        break;
        // Experiment byl inicializován
      case 0x02:
        this.toaster.success('Experiment byl inicializován.');
        break;
      case 0x03:
        this.toaster.warning('Konfigurace experimentů byla vymazána.');
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
    this._serialRawDataSubscription = this._serial.rawData$.subscribe((event: SerialDataEvent) => this._handleRawData(event));
  }

  ngOnDestroy(): void {
    this._serialRawDataSubscription.unsubscribe();
  }


  handleUploadExperiment() {
    this._command.experimentSetup(this._experimentID);
  }

  handleRunExperiment() {
    this._command.experimentStart(this._experimentID);
  }

  handleStopExperiment() {
    this._command.experimentStop(this._experimentID);
  }

  handleClearExperiment() {
    this._command.experimentClear();
  }

  get stimulatorOnline(): boolean {
    return this._serial.isSerialConnected;
  }

}
