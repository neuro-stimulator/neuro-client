import { Injectable } from '@angular/core';
import { filter, map, tap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AliveCheckerService } from '../infrastructure/alive-checker.service';
import * as ConnectionActions from './connection.actions';
import {
  IpcConnectionStateMessage,
  SocketMessage,
  SocketMessageSpecialization,
  SocketMessageType,
  StimulatorConnectionStateMessage,
} from '@stechy1/diplomka-share';

@Injectable()
export class ConnectionEffects {
  constructor(
    private readonly _service: AliveCheckerService,
    private readonly actions$: Actions
  ) {}

  serverConnect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ConnectionActions.actionServerConnectRequest),
        tap(() => {
          this._service.requestConnect();
        })
      ),
    { dispatch: false }
  );

  serverDisconnect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ConnectionActions.actionServerDisconnectRequest),
        tap(() => {
          this._service.requestDisconnect();
        })
      ),
    { dispatch: false }
  );

  connections$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConnectionActions.actionSocketData),
      map((action) => action.data as SocketMessage),
      tap((message: SocketMessage) => {
        console.log(message);
      }),
      filter(
        (message: SocketMessage) =>
          message.specialization === SocketMessageSpecialization.CONNECTION
      ),
      map((message: SocketMessage) => {
        switch (message.type) {
          case SocketMessageType.STIMULATOR_CONNECTION_STATE:
            const stimulatorConnectionMessage = message as StimulatorConnectionStateMessage;
            return stimulatorConnectionMessage.data.connected
              ? ConnectionActions.actionStimulatorConnected({})
              : ConnectionActions.actionStimulatorDisconnected({});
          case SocketMessageType.IPC_CONNECTION_STATE:
            const ipcConnectionMessage = message as IpcConnectionStateMessage;
            return ipcConnectionMessage.data.connected
              ? ConnectionActions.actionExternalConnected({})
              : ConnectionActions.actionExternalDisconnected({});
        }
      })
    )
  );
}
