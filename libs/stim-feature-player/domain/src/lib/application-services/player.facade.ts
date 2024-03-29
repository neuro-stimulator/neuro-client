import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ConnectionStatus, createEmptyExperiment, Experiment, Output } from '@stechy1/diplomka-share';

import { StimulatorFacade, StimulatorState, StimulatorStateType } from '@neuro-client/stim-feature-stimulator/domain';
import { AliveCheckerFacade, ConnectionInformationState } from '@neuro-client/stim-lib-connection';
import { ExperimentsFacade, ExperimentsState } from '@neuro-client/stim-feature-experiments/domain';

import { PlayerState, StopConditionType } from '../store/player.state';
import * as fromPlayer from '../store/player.reducer';
import * as PlayerActions from '../store/player.actions';

@Injectable()
export class PlayerFacade {
  public readonly stimulatorConnectionStatus$: Observable<ConnectionStatus>;
  public readonly stimulatorState$: Observable<number>;
  public readonly playingExperiment$: Observable<Experiment<Output>>;

  private _lastStimulatorState: number;

  constructor(
    private readonly store: Store,
    private readonly experiments: ExperimentsFacade,
    private readonly stimulator: StimulatorFacade,
    private readonly connections: AliveCheckerFacade
  ) {
    this.stimulatorConnectionStatus$ = connections.state.pipe(map((connectionInformation: ConnectionInformationState) => connectionInformation.stimulator));
    this.stimulatorState$ = this.stimulator.stimulatorState.pipe(
      map((stimulatorState: StimulatorState) => stimulatorState.stimulatorState),
      tap((state: number) => (this._lastStimulatorState = state))
    );
    this.playingExperiment$ = experiments.state.pipe(map((experimentsState: ExperimentsState) => experimentsState.selectedExperiment.experiment));
  }

  public loadExperiment(experimentID: number) {
    this.experiments.one(experimentID);
  }

  public requestPlayerState() {
    this.store.dispatch(PlayerActions.actionPlayerStateRequest());
  }

  public uploadExperiment(options) {
    this.store.dispatch(PlayerActions.actionPrepareExperimentPlayerRequest({ options }));
  }
  public runExperiment() {
    this.stimulator.experimentRun();
  }
  public pauseExperiment() {
    this.stimulator.experimentPause();
  }
  public finishExperiment() {
    this.stimulator.experimentFinish();
  }
  public handleForceFinishExperiment() {
    this.stimulator.handleForceFinishExperiment();
  }
  public clearExperiment() {
    this.store.dispatch(PlayerActions.actionPlayerClearExperiment());
    // Odeslat příkaz na vyčištění experimentu ze stimulátoru budu odesílat pouze,
    // pokud je stimulátor ve správném stavu
    // if (this._lastStimulatorState === StimulatorStateType.FINISH) {
    // this.stimulator.experimentClear();
    // }
  }

  public destroyExperiment() {
    this.experiments.empty(createEmptyExperiment());
  }

  get state(): Observable<PlayerState> {
    return this.store.select(fromPlayer.playerFeature);
  }

  get supportStopConditions(): Observable<boolean> {
    return this.store.select(fromPlayer.supportStopconditionsSelector);
  }

  get availableStopConditions(): Observable<StopConditionType[]> {
    return this.store.select(fromPlayer.availableStopConditions);
  }

  get lastStimulatorState(): StimulatorStateType {
    return this._lastStimulatorState;
  }

  requestAvailableStopConditions() {
    this.store.dispatch(PlayerActions.actionPlayerAvailableStopConditionsRequest());
  }
}
