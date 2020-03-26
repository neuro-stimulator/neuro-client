import { Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';

import { IOEvent, SerialDataEvent, StimulatorStateEvent } from '../share/serial-data.event';
import { CommandsService } from '../share/commands.service';
import { SerialService } from '../share/serial.service';
import { ExperimentsService } from '../experiments/experiments.service';
import { TranslateService } from '@ngx-translate/core';
import { CommandFromStimulator, CommandToStimulator } from '@stechy1/diplomka-share';
import { ExperimentViewerComponent } from '../share/experiment-viewer/experiment-viewer.component';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent implements OnInit, OnDestroy {

  private _experimentID: number;
  private _serialRawDataSubscription: Subscription;
  private _stimulatorState = 0;

  private _eventEmitter: EventEmitter<IOEvent> = new EventEmitter<IOEvent>();
  eventEmitter: Observable<IOEvent> = this._eventEmitter.asObservable();
  outputCount;

  public readonly BUTTON_DISABLED_STATES = {};

  @ViewChild(ExperimentViewerComponent)
  experimentViewer: ExperimentViewerComponent;

  constructor(private readonly _command: CommandsService,
              private readonly _serial: SerialService,
              private readonly _service: ExperimentsService,
              private readonly _router: Router,
              private readonly _route: ActivatedRoute,
              private readonly logger: NGXLogger,
              private readonly translator: TranslateService,
              private readonly toaster: ToastrService) {
    this._fillButtonStates();
  }

  private _fillButtonStates() {//                                                        upload,run,   pause, finish,clear
    this.BUTTON_DISABLED_STATES[CommandToStimulator.COMMAND_MANAGE_EXPERIMENT_READY]  = [false,  true,  true,  true,  true];
    this.BUTTON_DISABLED_STATES[CommandToStimulator.COMMAND_MANAGE_EXPERIMENT_UPLOAD] = [true,  true,  true,  true,  true];
    this.BUTTON_DISABLED_STATES[CommandToStimulator.COMMAND_MANAGE_EXPERIMENT_SETUP]  = [true,  false,  true,  true,  false];
    this.BUTTON_DISABLED_STATES[CommandToStimulator.COMMAND_MANAGE_EXPERIMENT_RUN]    = [true,  true,  false,  false,  true];
    this.BUTTON_DISABLED_STATES[CommandToStimulator.COMMAND_MANAGE_EXPERIMENT_PAUSE]  = [true,  false,  true,  true,  true];
    this.BUTTON_DISABLED_STATES[CommandToStimulator.COMMAND_MANAGE_EXPERIMENT_FINISH] = [false,  true,  true,  true,  true];
    this.BUTTON_DISABLED_STATES[CommandToStimulator.COMMAND_MANAGE_EXPERIMENT_CLEAR]  = [false,  true,  true,  true,  true];
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
    this._stimulatorState = event.state;
    if (event.noUpdate) {
      return;
    }

    const key = SerialService.getStimulatorStateTranslateValue(event.state);
    this.translator.get(key)
        .toPromise()
        .then((text: string) => {
          this.toaster.success(text);
        });
    if (event.state === CommandFromStimulator.COMMAND_STIMULATOR_STATE_FINISHED) {
      this._router.navigate(['/', 'results']);
    }
  }

  ngOnInit() {
    if (this._route.snapshot.params['type'] === undefined ||
        this._route.snapshot.params['id'] === undefined) {
      this._router.navigate(['/', 'experiments']);
    }

    this._experimentID = this._route.snapshot.params['id'];
    this._service.one(this._experimentID).then(experiment => {
      this.outputCount = experiment.outputCount;
    });
    this._serialRawDataSubscription = this._serial.rawData$.subscribe((event: SerialDataEvent) => this._handleRawData(event));
    this._command.stimulatorState();
  }

  ngOnDestroy(): void {
    this._serialRawDataSubscription.unsubscribe();
  }

  handleUploadExperiment() {
    this.experimentViewer.events = [];
    this._command.experimentUpload(this._experimentID);
  }

  handleRunExperiment() {
    this._command.experimentRun(this._experimentID);
  }

  handlePauseExperiment() {
    this._command.experimentPause(this._experimentID);
  }

  handleFinishExperiment() {
    this._command.experimentFinish(this._experimentID);
  }

  handleClearExperiment() {
    this._command.experimentClear();
  }

  get stimulatorOnline(): boolean {
    return this._serial.isSerialConnected;
  }

  get stimulatorState(): number {
    return this._stimulatorState;
  }
}
