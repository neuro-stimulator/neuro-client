import { Inject, Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { NGXLogger } from 'ngx-logger';

import { SocketMessage, ClientReadyMessage } from '@stechy1/diplomka-share';

import { TOKEN_BASE_API_URL } from '@diplomka-frontend/stim-lib-common';

import * as ConnectionActions from '../store/connection.actions';
import { ConnectionInformationState } from '../store/connection.state';
import { SocketMessageType } from '@stechy1/diplomka-share/lib/communication/client-server/socket-message-type';
import { SocketMessageSpecialization } from '@stechy1/diplomka-share/lib/communication/client-server/socket-message-specialization';

@Injectable({
  providedIn: 'root',
})
export class AliveCheckerService {
  /**
   * Socket pro komunikaci se serverem
   */
  private readonly _socket: Socket;

  constructor(@Inject(TOKEN_BASE_API_URL) baseURL: string, private readonly store: Store<ConnectionInformationState>, private readonly logger: NGXLogger) {
    this._socket = new Socket({ url: baseURL });
    this._socket.on('connect', () => this._socketConnected());
    this._socket.on('disconnect', (reason) => this._socketDisconnected(reason));
    this._socket.on('command', (data: SocketMessage) => this.store.dispatch(ConnectionActions.actionSocketData({ data })));
  }

  /**
   * Pokusí se vytvořit stálé spojení se serverem.
   */
  public requestConnect() {
    this.logger.info('Kontaktuji server s cílem navázat stále spojení...');
    this._socket.connect();
  }

  /**
   * Ukončí stálé spojení se serverem
   */
  public requestDisconnect() {
    this.logger.info('Ukončuji stálé spojení se serverem...');
    this._socket.disconnect();
  }

  /**
   * Funkce se zavolá ve chvíli, kdy je vytvořeno stále spojení se serverem.
   */
  protected _socketConnected() {
    this.logger.info('Spojení se serverem bylo úspěšně navázáno.');
    this.store.dispatch(ConnectionActions.actionServerConnected());
    setTimeout(() => {
      this._socket.emit('command', {
        type: SocketMessageType.CLIENT_READY,
        specialization: SocketMessageSpecialization.CLIENT,
      });
    }, 2000);
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
    this.logger.warn('Spojení se serverem bylo ukončeno!');
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
