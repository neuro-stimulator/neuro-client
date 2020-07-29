import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';

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
  IOEvent,
  ResponseObject,
  SocketMessage,
  SocketMessageSpecialization,
  SocketMessageType,
} from '@stechy1/diplomka-share';

import * as fromConnection from '@diplomka-frontend/stim-lib-connection';
import * as fromStimulator from '@diplomka-frontend/stim-feature-stimulator/domain';
import { StimulatorFacade } from '@diplomka-frontend/stim-feature-stimulator/domain';
import { ExperimentsFacade } from '@diplomka-frontend/stim-feature-experiments/domain';

import * as PlayerActions from './player.actions';
import { PlayerService } from '../infrastructure/player.service';

@Injectable()
export class PlayerEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly _service: PlayerService,
    private readonly experimentsFacade: ExperimentsFacade,
    private readonly stimulatorFacade: StimulatorFacade,
    private readonly router: Router
  ) {}

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
              return PlayerActions.actionPrepareExperimentPlayerRequestDone({});
            })
          );
      }),
      catchError((errorResponse) => {
        return of(PlayerActions.actionPrepareExperimentPlayerRequestFail({}));
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
      map(
        (playerData: {
          initialized: boolean;
          experimentRound: number;
          ioData: IOEvent[][];
        }) =>
          PlayerActions.actionPlayerUpdateState({
            initialized: playerData.initialized,
            experimentRound: playerData.experimentRound,
            ioData: playerData.ioData,
          })
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
}
