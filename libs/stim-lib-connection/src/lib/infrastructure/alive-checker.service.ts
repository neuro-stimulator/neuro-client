import { Injectable } from '@angular/core';

import { Store } from "@ngrx/store";
import { Socket } from 'ngx-socket-io';

import * as fromConnections from '../store/connection.state'
import * as ConnectionActions from '../store/connection.actions';

@Injectable({
  providedIn: 'root'
})
export class AliveCheckerService {
  /**
   * Socket pro komunikaci se serverem
   */
  private readonly _socket: Socket;

  constructor(private readonly store: Store<fromConnections.ConnectionInformationState>) {
    this._socket = new Socket({url: ''/*`${makeURL(environment.url.socket, environment.port.server)}`*/});
    this._socket.on('connect', () => this._socketConnected());
    this._socket.on('disconnect', (reason) => this._socketDisconnected(reason));
    this._socket.on('data', (data) => this.store.dispatch(ConnectionActions.actionSocketData({ data })));
  }

  /**
   * Pokusí se vytvořit stále spojení se serverem.
   */
  public requestConnect() {
    this._socket.connect();
  }

  /**
   * Oznámí zbytku aplikace, aby byla ukončena komunikace přes WebSockety se serverem.
   */
  public requestDisconnect() {
    this._socket.disconnect();
  }

  /**
   * Funkce se zavolá ve chvíli, kdy je vytvořeno stále spojení se serverem.
   */
  protected _socketConnected() {
    this.store.dispatch(ConnectionActions.actionServerConnected({}));
  //   const status = `SHARE.ALIVE_CHECKER.${this._firstTime ? 'SERVER_CONNECTION_CREATED' : 'SERVER_CONNECTION_RESTORED'}`;
  //   this.translator.get(status)
  //       .toPromise()
  //       .then((text: string) => {
  //         this.toastr.success(text);
  //       });
  //   this._connected.next(ConnectionStatus.CONNECTED);
  //   this._isConnected = true;
  }

  /**
   * Funkce se zavolá ve chvíli, kdy je spojení se serverem zrušeno.
   *
   * @param reason Důvod, proč se spojení zrušilo
   */
  protected _socketDisconnected(reason) {
    this.store.dispatch(ConnectionActions.actionServerDisconnected({ reason }));
  //   this._firstTime = false;
  //   this.translator.get('SHARE.ALIVE_CHECKER.SERVER_CONNECTION_LOST')
  //       .toPromise()
  //       .then((text: string) => {
  //         this.toastr.error(text);
  //       });
  //   this._connected.next(ConnectionStatus.DISCONNECTED);
  //   this._isConnected = false;
  //   if (reason === 'io server disconnect') {
  //     // the disconnection was initiated by the server, you need to reconnect manually
  //     this._socket.connect();
  //   }
  }

  // get connectionStatus(): Observable<ConnectionStatus> {
  //   return this.connected$;
  // }
  //
  // get isConnected(): boolean {
  //   return this._isConnected;
  // }
  //
  // get isDisconnected(): boolean {
  //   return !this.isConnected;
  // }
  //
  // get firstTime() {
  //   return this._firstTime;
  // }
  //
  // get disconnect(): Observable<any> {
  //   return this.requestDisconnect$;
  // }

}


