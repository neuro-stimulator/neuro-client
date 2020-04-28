import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Socket } from 'ngx-socket-io';

import { ResponseObject} from '@stechy1/diplomka-share';

import { environment, makeURL } from '../../environments/environment';
import { AliveCheckerService, ConnectionStatus } from '../alive-checker.service';

@Injectable({
  providedIn: 'root'
})
export class IpcService {

  /**
   * Konstanta reprezentující výchozí URL adresu pro požadavky týkající se seriové linky
   */
  private static readonly BASE_API_URL = `${makeURL(environment.url.server, environment.port.server)}/api/ipc`;

  /**
   * Socket pro komunikaci mezi WebServerem a Webovou aplikací
   */
  private readonly _socket = new Socket({url: `${makeURL(environment.url.socket, environment.port.server)}/ipc`});

  private _isIpcConnected: boolean;

  constructor(aliveChecker: AliveCheckerService,
              private readonly _http: HttpClient) {
    this._isIpcConnected = false;
    aliveChecker.connectionStatus.subscribe((status: ConnectionStatus) => {
      if (status === ConnectionStatus.CONNECTED) {
        this._socket.connect();
      }
    });
    aliveChecker.disconnect.subscribe(() => {
      if (this._socket !== undefined) {
        this._socket.disconnect();
        this._isIpcConnected = false;
      }
    });
    this._socket.on('connect', () => {
      this.status();
    });
    this._socket.on('status', (data) => {
      if (this._isIpcConnected === data.connected) {
        return;
      }

      this._isIpcConnected = data.connected;
    });
  }

  /**
   * Vyšle požadavek pro získání informaci o připojení podpůrného programu přes IPC
   */
  public status() {
    this._http.get<ResponseObject<{connected: boolean}>>(`${IpcService.BASE_API_URL}/status`)
        .toPromise()
        .then((response: ResponseObject<{connected: boolean}>) => {
          this._isIpcConnected = response.data.connected;
        });
  }

  /**
   * Getter indikující, zda-li je připojený podpůrný program pro zobrazování obrázků a přehrávání zvuků přes IPC
   */
  public get isIpcConnected() {
    return this._isIpcConnected;
  }
}
