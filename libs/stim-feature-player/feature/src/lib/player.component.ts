import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

import { Experiment, Output, ConnectionStatus } from '@stechy1/diplomka-share';

import { ContentTogglerDirective, ExperimentViewerComponent } from '@neuro-client/stim-lib-ui';
import { PlayerFacade, PlayerState, StopConditionType } from '@neuro-client/stim-feature-player/domain';
import { NavigationFacade } from '@neuro-client/stim-feature-navigation/domain';
import { StimulatorStateType } from '@neuro-client/stim-feature-stimulator/domain';

@Component({
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass'],
})
export class PlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  private _experimentSubscription: Subscription;
  private _stimulatorStateSubscription: Subscription;
  private _playerStateSubscription: Subscription;
  private _repeatValueSubscription: Subscription;
  private _autoplayValueSubscription: Subscription;

  public readonly BUTTON_DISABLED_STATES = {};

  @ViewChild(ExperimentViewerComponent)
  experimentViewer: ExperimentViewerComponent;
  @ViewChild('paramsUiContentToggler', { read: ContentTogglerDirective })
  paramsUiContentToggler: ContentTogglerDirective;

  form = new FormGroup({
    repeat: new FormControl(1, [Validators.required, Validators.min(0)]),
    betweenExperimentInterval: new FormControl({ value: 0, disabled: true }, [Validators.min(0)]),
    autoplay: new FormControl({ value: false, disabled: true }),
    stopConditionType: new FormControl(0, [Validators.required]),
    stopConditions: new FormGroup({}),
  });

  ConnectionStatus = ConnectionStatus;
  private _stimulatorState: number;

  constructor(
    private readonly player: PlayerFacade,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _navigation: NavigationFacade,
    private readonly logger: NGXLogger
  ) {
    this._fillButtonStates();
  }

  private _fillButtonStates() {
    this.BUTTON_DISABLED_STATES[StimulatorStateType.UNKNOWN] = [true, true, true, true, true]; // upload, run, pause, finish, clear
    this.BUTTON_DISABLED_STATES[StimulatorStateType.READY] = [false, true, true, true, true]; // upload, run, pause, finish, clear
    this.BUTTON_DISABLED_STATES[StimulatorStateType.UPLOAD] = [true, true, true, true, false]; // upload, run, pause, finish, clear
    this.BUTTON_DISABLED_STATES[StimulatorStateType.SETUP] = [true, false, true, true, false]; // upload, run, pause, finish, clear
    this.BUTTON_DISABLED_STATES[StimulatorStateType.RUN] = [true, true, false, false, true]; // upload, run, pause, finish, clear
    this.BUTTON_DISABLED_STATES[StimulatorStateType.PAUSE] = [true, false, true, true, true]; // upload, run, pause, finish, clear
    this.BUTTON_DISABLED_STATES[StimulatorStateType.FINISH] = [false, true, true, true, true]; // upload, run, pause, finish, clear
    this.BUTTON_DISABLED_STATES[StimulatorStateType.CLEAR] = [false, true, true, true, true]; // upload, run, pause, finish, clear
    Object.freeze(this.BUTTON_DISABLED_STATES);
  }

  ngOnInit() {
    if (this._route.snapshot.params['type'] === undefined || this._route.snapshot.params['id'] === undefined) {
      this._router.navigate(['/', 'experiments']);
    }

    this._experimentSubscription = this.experiment.subscribe((experiment: Experiment<Output>) => {
      this._navigation.titleArgs = { name: experiment.name };
      this.player.requestAvailableStopConditions();
    });
    this.player.loadExperiment(this._route.snapshot.params['id']);
    this._stimulatorStateSubscription = this.player.stimulatorState$.subscribe((status: number) => {
      this._stimulatorState = status;
      if (status === StimulatorStateType.READY || status === StimulatorStateType.CLEAR) {
        this.logger.info('Aktivuji formulářové prvky.');
        this.form.enable();
        this._updateDisabledAutoplay(this.repeat.value, true);
      } else {
        this.logger.info('Deaktivuji formulářové prvky.');
        this.form.disable();
        this._updateDisabledAutoplay(this.repeat.value, true);
      }
    });
    this._playerStateSubscription = this.player.state.subscribe((state: PlayerState) => {
      this.form.patchValue({
        repeat: state.repeat,
        betweenExperimentInterval: state.betweenExperimentInterval,
        autoplay: state.autoplay,
        stopConditionType: state.stopConditionType,
      });
    });
    this._repeatValueSubscription = this.repeat.valueChanges.subscribe((repeat: number) => {
      this._updateDisabledAutoplay(repeat > 0, this._allowControlReset());
      this._updateDisabledStopConditions(this._allowControlReset());
    });
    this._autoplayValueSubscription = this.autoplay.valueChanges.subscribe((enabled: boolean) => this._updateBetweenExperimentInterval(enabled, this._allowControlReset()));
  }

  ngAfterViewInit(): void {
    this.player.requestPlayerState();
  }

  ngOnDestroy(): void {
    this._experimentSubscription.unsubscribe();
    this.player.clearExperiment();
    this.player.destroyExperiment();
    this._stimulatorStateSubscription.unsubscribe();
    this._playerStateSubscription.unsubscribe();
    this._repeatValueSubscription.unsubscribe();
    this._autoplayValueSubscription.unsubscribe();
  }

  private _allowControlReset(): boolean {
    return this._stimulatorState === StimulatorStateType.READY || this._stimulatorState === StimulatorStateType.CLEAR;
  }

  private _updateDisabledAutoplay(enabled: boolean, reset: boolean) {
    if (enabled) {
      this.autoplay.enable();
    } else {
      this.autoplay.disable();
      if (reset) {
        this.autoplay.reset(false);
      }
    }
  }

  private _updateBetweenExperimentInterval(enabled: boolean, reset: boolean) {
    if (enabled) {
      this.betweenExperimentInterval.enable();
    } else {
      if (reset) {
        this.betweenExperimentInterval.reset(0);
      }
      this.betweenExperimentInterval.disable();
    }
  }

  private _updateDisabledStopConditions(reset: boolean) {
    if (reset) {
      this.stopConditionType.reset(0);
      this.stopConditions.reset({});
    }
  }

  handleUploadExperiment() {
    this.player.uploadExperiment(this.form.value);
    this.paramsUiContentToggler.visible = false;
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

  handleForceFinishExperiment() {
    this.player.handleForceFinishExperiment();
  }

  handleClearExperiment() {
    this.player.clearExperiment();
    this.paramsUiContentToggler.visible = true;
  }

  get stimulatorConnectionStatus(): Observable<ConnectionStatus> {
    return this.player.stimulatorConnectionStatus$;
  }

  get stimulatorStatus(): Observable<number> {
    return this.player.stimulatorState$;
  }

  get supportStopConditions(): Observable<boolean> {
    return this.player.supportStopConditions;
  }

  get availableStopConditions(): Observable<StopConditionType[]> {
    return this.player.availableStopConditions;
  }

  get experiment(): Observable<Experiment<Output>> {
    return this.player.playingExperiment$;
  }

  get state(): Observable<PlayerState> {
    return this.player.state;
  }

  get repeat(): FormControl {
    return this.form.get('repeat') as FormControl;
  }

  get betweenExperimentInterval(): FormControl {
    return this.form.get('betweenExperimentInterval') as FormControl;
  }

  get autoplay(): FormControl {
    return this.form.get('autoplay') as FormControl;
  }

  get stopConditionType(): FormControl {
    return this.form.get('stopConditionType') as FormControl;
  }
  get stopConditions(): FormGroup {
    return this.form.get('stopConditions') as FormGroup;
  }
}
