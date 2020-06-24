import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Experiment } from '@stechy1/diplomka-share';

import {
  StimulatorFacade,
  StimulatorState,
} from '@diplomka-frontend/stim-feature-stimulator/domain';
import {
  AliveCheckerFacade,
  ConnectionInformationState,
  ConnectionStatus,
} from '@diplomka-frontend/stim-lib-connection';
import {
  ExperimentsFacade,
  ExperimentsState,
} from '@diplomka-frontend/stim-feature-experiments/domain';
import { PlayerState } from '../store/player.state';
import * as fromPlayer from '../store/player.reducer';
import * as PlayerActions from '../store/player.actions';

@Injectable()
export class PlayerFacade {
  public readonly stimulatorConnectionStatus$: Observable<ConnectionStatus>;
  public readonly stimulatorState$: Observable<number>;
  public readonly playingExperiment$: Observable<Experiment>;

  constructor(
    private readonly store: Store<PlayerState>,
    private readonly experiments: ExperimentsFacade,
    private readonly stimulator: StimulatorFacade,
    private readonly connections: AliveCheckerFacade
  ) {
    this.stimulatorConnectionStatus$ = connections.state.pipe(
      map(
        (connectionInformation: ConnectionInformationState) =>
          connectionInformation.stimulator
      )
    );
    this.stimulatorState$ = this.stimulator.stimulatorState.pipe(
      map((stimulatorState: StimulatorState) => stimulatorState.stimulatorState)
    );
    this.playingExperiment$ = experiments.state.pipe(
      map(
        (experimentsState: ExperimentsState) =>
          experimentsState.selectedExperiment.experiment
      )
    );
  }

  public loadExperiment(experimentID: number) {
    this.experiments.one(experimentID);
  }

  public uploadExperiment() {
    this.stimulator.experimentUpload();
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
  public clearExperiment() {
    this.stimulator.experimentClear();
  }

  get state(): Observable<PlayerState> {
    // @ts-ignore
    return this.store.select(fromPlayer.playerReducerKey);
  }
}
