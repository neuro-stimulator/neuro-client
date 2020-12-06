import { Injectable } from '@angular/core';
import { filter, map, tap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  ConnectionStatus,
  IpcConnectionStateMessage,
  SocketMessage,
  SocketMessageSpecialization,
  SocketMessageType,
  StimulatorConnectionStateMessage,
} from '@stechy1/diplomka-share';

import { AliveCheckerService } from '../infrastructure/alive-checker.service';
import * as ConnectionActions from './connection.actions';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ConnectionEffects {
  constructor(private readonly _service: AliveCheckerService, private readonly _toastr: ToastrService, private readonly actions$: Actions) {}

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
      filter((message: SocketMessage) => message.specialization === SocketMessageSpecialization.CONNECTION),
      map((message: SocketMessage) => {
        switch (message.type) {
          case SocketMessageType.STIMULATOR_CONNECTION_STATE: {
            const stimulatorConnectionMessage = message as StimulatorConnectionStateMessage;
            const actions = {};
            actions[ConnectionStatus.DISCONNECTED] = ConnectionActions.actionStimulatorDisconnected;
            actions[ConnectionStatus.CONNECTED] = ConnectionActions.actionStimulatorConnected;
            return actions[stimulatorConnectionMessage.data.status]();
          }
          case SocketMessageType.IPC_CONNECTION_STATE: {
            const ipcConnectionMessage = message as IpcConnectionStateMessage;
            const actions = {};
            actions[ConnectionStatus.CLOSED] = ConnectionActions.actionIpcClosed;
            actions[ConnectionStatus.OPEN] = ConnectionActions.actionIpcOpened;
            actions[ConnectionStatus.DISCONNECTED] = ConnectionActions.actionAssetPlayerDisconnected;
            actions[ConnectionStatus.CONNECTED] = ConnectionActions.actionAssetPlayerConnected;
            return actions[ipcConnectionMessage.data.status]();
          }
        }
      })
    )
  );

  messageFromServer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ConnectionActions.actionSocketData),
        map((action) => action.data as SocketMessage),
        filter((message: SocketMessage) => message.notification !== undefined),
        tap((message: SocketMessage) => {
          this._toastr.info(`${message.notification.code}`);
        })
      ),
    { dispatch: false }
  );

  sendMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ConnectionActions.actionSendSocketData),
        tap((action) => this._service.sendSocketData(action.data))
      ),
    { dispatch: false }
  );
}
