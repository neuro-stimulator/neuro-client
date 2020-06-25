import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as PlayerActions from './player.actions';
import * as fromConnection from '@diplomka-frontend/stim-lib-connection';
import { filter, map } from 'rxjs/operators';
import {
  IOEvent,
  SocketMessage,
  SocketMessageSpecialization,
  SocketMessageType,
} from '@stechy1/diplomka-share';

@Injectable()
export class PlayerEffects {
  constructor(private readonly actions$: Actions) {}

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
}
