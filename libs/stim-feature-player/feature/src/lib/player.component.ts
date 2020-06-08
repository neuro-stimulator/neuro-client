import { Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { CommandToStimulator, IOEvent, SerialDataEvent, StimulatorStateEvent } from '@stechy1/diplomka-share';

import { ExperimentViewerComponent } from "@diplomka-frontend/stim-lib-ui";
import { ConnectionStatus } from "@diplomka-frontend/stim-lib-connection";
import { PlayerFacade } from "@diplomka-frontend/stim-feature-player/domain";

@Component({
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

  ConnectionStatus = ConnectionStatus;

  constructor(private readonly player: PlayerFacade
    // private readonly _command: StimulatorService,
    //           private readonly _serial: SerialService,
    //           private readonly _service: ExperimentsService,
    //           private readonly _router: Router,
    //           private readonly _route: ActivatedRoute,
    //           private readonly _navigation: NavigationFacade,
    //           private readonly logger: NGXLogger,
    //           private readonly translator: TranslateService,
    //           private readonly toaster: ToastrService
  ) {
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
    // this._stimulatorState = event.state;
    // if (event.noUpdate) {
    //   return;
    // }
    //
    // const key = SerialService.getStimulatorStateTranslateValue(event.state);
    // this.translator.get(key)
    //     .toPromise()
    //     .then((text: string) => {
    //       this.toaster.success(text);
    //     });
    // if (event.state === CommandFromStimulator.COMMAND_STIMULATOR_STATE_FINISHED) {
    //   this._router.navigate(['/', 'results']);
    // }
  }

  ngOnInit() {
    // if (this._route.snapshot.params['type'] === undefined ||
    //     this._route.snapshot.params['id'] === undefined) {
    //   this._router.navigate(['/', 'experiments']);
    // }
    //
    // this._experimentID = this._route.snapshot.params['id'];
    // this._service.one(this._experimentID).then((experiment: Experiment) => {
    //   this.outputCount = experiment.outputCount;
    //   this._navigation.titleArgs = { name: experiment.name };
    // });
    // this._serialRawDataSubscription = this._serial.rawData$.subscribe((event: SerialDataEvent) => this._handleRawData(event));
    // this._command.stimulatorState();
  }

  ngOnDestroy(): void {
    this._serialRawDataSubscription.unsubscribe();
  }

  handleUploadExperiment() {
    this.experimentViewer.events = [];
    this.player.uploadExperiment();
  }

  handleRunExperiment() {
    this.player.runExperiment();
  }

  handlePauseExperiment() {
    this.player.pauseExperiment();
  }

  handleFinishExperiment() {
    this.player.finishExperiment();
  }

  handleClearExperiment() {
    this.player.clearExperiment();
  }

  get stimulatorStatus(): Observable<ConnectionStatus> {
    return this.player.stimulatorOnline$;
  }

  get stimulatorState(): number {
    return this._stimulatorState;
  }
}
