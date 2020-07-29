import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable, of, Subscription } from 'rxjs';

import { CommandToStimulator, Experiment } from '@stechy1/diplomka-share';

import { ExperimentViewerComponent } from '@diplomka-frontend/stim-lib-ui';
import { ConnectionStatus } from '@diplomka-frontend/stim-lib-connection';
import { PlayerFacade } from '@diplomka-frontend/stim-feature-player/domain';
import { NavigationFacade } from '@diplomka-frontend/stim-feature-navigation/domain';
import { PlayerState } from '@diplomka-frontend/stim-feature-player/domain';
import { map, tap } from 'rxjs/operators';

@Component({
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass'],
})
export class PlayerComponent implements OnInit, OnDestroy {
  private _experimentSubscription: Subscription;

  public readonly BUTTON_DISABLED_STATES = {};

  @ViewChild(ExperimentViewerComponent)
  experimentViewer: ExperimentViewerComponent;
  form = new FormGroup({
    repeat: new FormControl(1, [Validators.required]),
    betweenExperimentInterval: new FormControl(0, [Validators.min(0)]),
    stopConditions: new FormGroup({
      maxOutput: new FormControl(10),
    }),
  });

  ConnectionStatus = ConnectionStatus;

  constructor(
    private readonly player: PlayerFacade,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _navigation: NavigationFacade
  ) {
    this._fillButtonStates();
  }

  private _fillButtonStates() {
    this.BUTTON_DISABLED_STATES[
      CommandToStimulator.COMMAND_MANAGE_EXPERIMENT_READY
    ] = [false, true, true, true, true]; // upload, run, pause, finish, clear
    this.BUTTON_DISABLED_STATES[
      CommandToStimulator.COMMAND_MANAGE_EXPERIMENT_UPLOAD
    ] = [true, true, true, true, false]; // upload, run, pause, finish, clear
    this.BUTTON_DISABLED_STATES[
      CommandToStimulator.COMMAND_MANAGE_EXPERIMENT_SETUP
    ] = [true, false, true, true, false]; // upload, run, pause, finish, clear
    this.BUTTON_DISABLED_STATES[
      CommandToStimulator.COMMAND_MANAGE_EXPERIMENT_RUN
    ] = [true, true, false, false, true]; // upload, run, pause, finish, clear
    this.BUTTON_DISABLED_STATES[
      CommandToStimulator.COMMAND_MANAGE_EXPERIMENT_PAUSE
    ] = [true, false, true, true, true]; // upload, run, pause, finish, clear
    this.BUTTON_DISABLED_STATES[
      CommandToStimulator.COMMAND_MANAGE_EXPERIMENT_FINISH
    ] = [false, true, true, true, true]; // upload, run, pause, finish, clear
    this.BUTTON_DISABLED_STATES[
      CommandToStimulator.COMMAND_MANAGE_EXPERIMENT_CLEAR
    ] = [false, true, true, true, true]; // upload, run, pause, finish, clear
    Object.freeze(this.BUTTON_DISABLED_STATES);
  }

  ngOnInit() {
    if (
      this._route.snapshot.params['type'] === undefined ||
      this._route.snapshot.params['id'] === undefined
    ) {
      this._router.navigate(['/', 'experiments']);
    }

    this._experimentSubscription = this.experiment.subscribe(
      (experiment: Experiment) => {
        this._navigation.titleArgs = { name: experiment.name };
      }
    );
    this.player.loadExperiment(this._route.snapshot.params['id']);
  }

  ngOnDestroy(): void {
    this._experimentSubscription.unsubscribe();
    this.player.clearExperiment();
    this.player.destroyExperiment();
  }

  handleUploadExperiment() {
    this.player.uploadExperiment(this.form.value);
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

  get stimulatorConnectionStatus(): Observable<ConnectionStatus> {
    return this.player.stimulatorConnectionStatus$;
  }

  get stimulatorStatus(): Observable<number> {
    return this.player.stimulatorState$;
  }

  get experiment(): Observable<Experiment> {
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

  // readonly useBetweenExperimentInterval: Observable<
  //   boolean
  // > = this.form.valueChanges.pipe(
  //   tap((value) => console.log(value)),
  //   map((value) => value.repeat == 1)
  // );
}
