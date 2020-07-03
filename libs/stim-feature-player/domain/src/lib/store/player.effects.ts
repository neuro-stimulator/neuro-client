import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { filter, map, switchMap} from 'rxjs/operators';

import {
  ExperimentResultCreatedMessage,
  IOEvent,
  SocketMessage,
  SocketMessageSpecialization,
  SocketMessageType,
} from "@stechy1/diplomka-share";

import * as fromConnection from '@diplomka-frontend/stim-lib-connection';
import {
  ExperimentsFacade,
} from '@diplomka-frontend/stim-feature-experiments/domain';

import * as PlayerActions from './player.actions';

@Injectable()
export class PlayerEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly facade: ExperimentsFacade,
    private readonly router: Router
  ) {}

  stimulatorIOData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromConnection.actionSocketData),
      map((action) => action.data),
      filter(
        (message: SocketMessage) =>
          message.specialization === SocketMessageSpecialization.STIMULATOR
      ),
      filter(
        (message: SocketMessage) =>
          message.type === SocketMessageType.STIMULATOR_DATA_IO
      ),
      map((message: SocketMessage) => message.data as IOEvent),
      map((ioEvent: IOEvent) => PlayerActions.actionPlayerIOEvent({ ioEvent }))
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
            message.data as ExperimentResultCreatedMessage
        ),
        switchMap((message: ExperimentResultCreatedMessage) =>
          this.router.navigate([
            '/',
            'results',
            message.data.experimentResultID,
          ])
        )
      ),
    { dispatch: false }
  );
}
