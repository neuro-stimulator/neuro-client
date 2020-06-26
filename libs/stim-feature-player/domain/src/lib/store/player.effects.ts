import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import {
  IOEvent,
  SocketMessage,
  SocketMessageSpecialization,
  SocketMessageType,
  StimulatorStateEvent,
} from '@stechy1/diplomka-share';

import * as fromConnection from '@diplomka-frontend/stim-lib-connection';
import {
  StimulatorFacade,
  StimulatorState,
  StimulatorStateType,
} from '@diplomka-frontend/stim-feature-stimulator/domain';

import * as PlayerActions from './player.actions';

@Injectable()
export class PlayerEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly facade: StimulatorFacade,
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
            message.specialization === SocketMessageSpecialization.STIMULATOR
        ),
        filter(
          (message: SocketMessage) =>
            message.type === SocketMessageType.STIMULATOR_DATA_STATE
        ),
        map((message: SocketMessage) => message.data as StimulatorStateEvent),
        filter(
          (event: StimulatorStateEvent) =>
            event.state === StimulatorStateType.FINISH
        ),
        withLatestFrom(this.facade.stimulatorState),
        switchMap(([event, state]) =>
          this.router.navigate([
            '/',
            'results',
            (state as StimulatorState).stimulatorState,
          ])
        )
      ),
    { dispatch: false }
  );
}
