import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';

import { environment, makeURL } from '../environments/environment';
import { NavigationService } from './navigation/navigation.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AliveCheckerService {

  /**
   * Socket pro komunikaci se serverem
   */
  private readonly _socket: Socket;
  /**
   * Tato proměnná udržuje informaci o stavu připojení
   * Kdykoliv se stav změní, vyšle všem svým pozorovatelům informaci o změně
   */
  private readonly _connected: BehaviorSubject<ConnectionStatus> = new BehaviorSubject<ConnectionStatus>(ConnectionStatus.DISCONNECTED);
  private readonly connected$ = this._connected.asObservable();
  private readonly _requestDisconnect: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private readonly requestDisconnect$ = this._requestDisconnect.asObservable();
  private _firstTime = true;
  private _isConnected = false;

  constructor(private readonly navigation: NavigationService,
              private readonly translator: TranslateService,
              private readonly toastr: ToastrService) {
    this._socket = new Socket({url: `${makeURL(environment.url.socket, environment.port.server)}`});
    this._socket.on('connect', () => this._socketConnected());
    this._socket.on('disconnect', (reason) => this._socketDisconnected(reason));
  }

  /**
   * Pokusí se vytvořit stále spojení se serverem.
   */
  public requestConnect() {
    this._connected.next(ConnectionStatus.CONNECTING);
  }

  /**
   * Oznámí zbytku aplikace, aby byla ukončena komunikace přes WebSockety se serverem.
   */
  public requestDisconnect() {
    this._requestDisconnect.next(null);
    this._socket.disconnect();
  }

  /**
   * Funkce se zavolá ve chvíli, kdy je vytvořeno stále spojení se serverem.
   */
  protected _socketConnected() {
    const status = `SHARE.ALIVE_CHECKER.${this._firstTime ? 'SERVER_CONNECTION_CREATED' : 'SERVER_CONNECTION_RESTORED'}`;
    this.translator.get(status)
        .toPromise()
        .then((text: string) => {
          this.toastr.success(text);
        });
    this._connected.next(ConnectionStatus.CONNECTED);
    this._isConnected = true;
  }

  /**
   * Funkce se zavolá ve chvíli, kdy je spojení se serverem zrušeno.
   *
   * @param reason Důvod, proč se spojení zrušilo
   */
  protected _socketDisconnected(reason) {
    this._firstTime = false;
    this.translator.get('SHARE.ALIVE_CHECKER.SERVER_CONNECTION_LOST')
        .toPromise()
        .then((text: string) => {
          this.toastr.error(text);
        });
    this._connected.next(ConnectionStatus.DISCONNECTED);
    this._isConnected = false;
    if (reason === 'io server disconnect') {
      // the disconnection was initiated by the server, you need to reconnect manually
      this._socket.connect();
    }
  }

  get connectionStatus(): Observable<ConnectionStatus> {
    return this.connected$;
  }

  get isConnected(): boolean {
    return this._isConnected;
  }

  get isDisconnected(): boolean {
    return !this.isConnected;
  }

  get firstTime() {
    return this._firstTime;
  }

  get disconnect(): Observable<any> {
    return this.requestDisconnect$;
  }

}

/**
 * Výčet stavu spojení se serverem
 */
export enum ConnectionStatus {
  DISCONNECTED, CONNECTING, CONNECTED
}
