import { Inject, Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { NGXLogger } from 'ngx-logger';

import { SocketMessage, SocketMessageType, SocketMessageSpecialization } from '@stechy1/diplomka-share';

import { TOKEN_BASE_API_URL } from '@neuro-client/stim-lib-common';

import * as ConnectionActions from '../store/connection.actions';

@Injectable({
  providedIn: 'root',
})
export class AliveCheckerService {
  /**
   * Socket pro komunikaci se serverem
   */
  private readonly _socket: Socket;

  constructor(@Inject(TOKEN_BASE_API_URL) baseURL: string, private readonly store: Store, private readonly logger: NGXLogger) {
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

  public sendSocketData(data: SocketMessage) {
    this.logger.debug(`Odesílám socket zprávu na server: '${JSON.stringify(data)}'.`);
    this._socket.emit('command', data);
  }

  /**
   * Funkce se zavolá ve chvíli, kdy je vytvořeno stále spojení se serverem.
   */
  protected _socketConnected() {
    this.logger.info('Spojení se serverem bylo úspěšně navázáno.');
    this.store.dispatch(ConnectionActions.actionServerConnected());
    setTimeout(() => {
      this.sendSocketData({
        type: SocketMessageType.CLIENT_READY,
        specialization: SocketMessageSpecialization.CLIENT,
        data: null,
      });
    }, 2000);
  }

  /**
   * Funkce se zavolá ve chvíli, kdy je spojení se serverem zrušeno.
   *
   * @param reason Důvod, proč se spojení zrušilo
   */
  protected _socketDisconnected(reason) {
    this.logger.warn('Spojení se serverem bylo ukončeno!');
    this.store.dispatch(ConnectionActions.actionServerDisconnected({ reason }));
  }
}
