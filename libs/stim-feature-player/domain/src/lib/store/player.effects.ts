import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import {
  catchError,
  filter,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';

import {
  ExperimentResultCreatedMessage,
  ExperimentStopConditionType,
  IOEvent,
  PlayerConfiguration,
  ResponseObject,
  SocketMessage,
  SocketMessageSpecialization,
  SocketMessageType,
} from '@stechy1/diplomka-share';

import { PlayerState } from '@diplomka-frontend/stim-feature-player/domain';
import * as fromConnection from '@diplomka-frontend/stim-lib-connection';
import * as fromStimulator from '@diplomka-frontend/stim-feature-stimulator/domain';
import { StimulatorFacade } from '@diplomka-frontend/stim-feature-stimulator/domain';
import {
  ExperimentsFacade,
  ExperimentsState,
} from '@diplomka-frontend/stim-feature-experiments/domain';

import * as PlayerActions from './player.actions';
import { PlayerService } from '../infrastructure/player.service';

@Injectable()
export class PlayerEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly _service: PlayerService,
    private readonly store: Store<PlayerState>,
    private readonly experimentsFacade: ExperimentsFacade,
    private readonly stimulatorFacade: StimulatorFacade,
    private readonly router: Router
  ) {}

  stateRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.actionPlayerStateRequest),
      switchMap((action) =>
        this._service
          .getPlayerState()
          .pipe(
            map((response: ResponseObject<PlayerConfiguration>) =>
              PlayerActions.actionPlayerUpdateState(response.data)
            )
          )
      )
    )
  );

  prepareExperimentPlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.actionPrepareExperimentPlayerRequest),
      withLatestFrom(this.experimentsFacade.state),
      switchMap(([action, experimentState]) => {
        return this._service
          .prepareExperimentPlayer(
            experimentState.selectedExperiment.experiment.id,
            action.options
          )
          .pipe(
            map((response: ResponseObject<any>) => {
              return PlayerActions.actionPrepareExperimentPlayerRequestDone({
                autoplay: action.options.autoplay,
                betweenExperimentInterval:
                  action.options.betweenExperimentInterval,
                repeat: action.options.repeat,
              });
            }),
            catchError((error) => {
              return of(
                PlayerActions.actionPrepareExperimentPlayerRequestFail({})
              );
            })
          );
      })
    )
  );

  prepareExperimentPlayerDone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.actionPrepareExperimentPlayerRequestDone),
      map(() => fromStimulator.actionCommandStimulatorUploadRequest({}))
    )
  );

  stimulatorIOData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromConnection.actionSocketData),
      map((action) => action.data),
      filter(
        (message: SocketMessage) =>
          message.specialization ===
          SocketMessageSpecialization.EXPERIMENT_PLAYER
      ),
      filter(
        (message: SocketMessage) =>
          message.type === SocketMessageType.EXPERIMENT_PLAYER_DATA_IO
      ),
      map((message: SocketMessage) => message.data as IOEvent),
      map((ioEvent: IOEvent) => PlayerActions.actionPlayerIOEvent({ ioEvent }))
    )
  );

  playerState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromConnection.actionSocketData),
      map((action) => action.data),
      filter(
        (message: SocketMessage) =>
          message.specialization ===
          SocketMessageSpecialization.EXPERIMENT_PLAYER
      ),
      filter(
        (message: SocketMessage) =>
          message.type === SocketMessageType.EXPERIMENT_PLAYER_STATE
      ),
      map((message: SocketMessage) => message.data),
      map((playerData: PlayerConfiguration) =>
        PlayerActions.actionPlayerUpdateState(playerData)
      )
    )
  );

  createNewExperimentRound$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromConnection.actionSocketData),
      map((action) => action.data),
      filter(
        (message: SocketMessage) =>
          message.specialization ===
          SocketMessageSpecialization.EXPERIMENT_PLAYER
      ),
      filter((message: SocketMessage) => message.type === 99),
      map(() => PlayerActions.actionPlayerCreateNewExperimentRound({}))
    )
  );

  experimentFinished$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromConnection.actionSocketData),
        map((action) => action.data),
        filter(
          (message: SocketMessage) =>
            message.specialization ===
            SocketMessageSpecialization.EXPERIMENT_RESULTS
        ),
        filter(
          (message: SocketMessage) =>
            message.type === SocketMessageType.EXPERIMENT_RESULT_CREATED
        ),
        map(
          (message: SocketMessage) =>
            (message as ExperimentResultCreatedMessage).data.experimentResultID
        ),
        switchMap((experimentResultID: number) =>
          this.router.navigate(['/', 'results', experimentResultID])
        )
      ),
    { dispatch: false }
  );

  clearExperiment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.actionPlayerClearExperiment),
      // @ts-ignore
      withLatestFrom(this.store.select('player')),
      map(([action, state]) => {
        // @ts-ignore
        if (state.initialized) {
          return fromStimulator.actionCommandStimulatorClearRequest({});
        } else {
          return PlayerActions.actionPlayerNoAction({});
        }
      })
    )
  );

  availableStopConditions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.actionPlayerAvailableStopConditionsRequest),
      withLatestFrom(this.experimentsFacade.state),
      switchMap(([action, experimentsState]: [any, ExperimentsState]) =>
        this._service
          .getAvailableStopConditions(
            experimentsState.selectedExperiment.experiment.type
          )
          .pipe(
            map((response: ResponseObject<ExperimentStopConditionType[]>) => {
              return PlayerActions.actionPlayerAvailableStopConditionsDone({
                stopConditions: response.data,
              });
            }),
            catchError((error) => {
              return of(
                PlayerActions.actionPlayerAvailableStopConditionsFail({})
              );
            })
          )
      )
    )
  );
}
