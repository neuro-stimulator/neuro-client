import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../environments/environment';
import { AliveCheckerService, ConnectionStatus } from '../alive-checker.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResponseObject } from 'diplomka-share';

@Injectable({
  providedIn: 'root'
})
export class SerialService {

  /**
   * Konstanta reprezentující výchozí URL adresu pro požadavky týkající se seriové linky
   */
  private static readonly BASE_API_URL = `${environment.makeURL(environment.url.server, environment.port.server)}/api/low-level`;

  /**
   * Emitter pro přijatá data
   * Kdykoliv přijdou nějaká data ze serveru, tento emitter je pošle dál ke zpracování
   */
  private readonly _rawData: EventEmitter<any> = new EventEmitter<any>();
  public readonly rawData$: Observable<any> = this._rawData.asObservable();

  /**
   * Socket pro komunikaci mezi WebServerem a Webovou aplikací
   */
  private readonly _socket = new Socket({url: `${environment.makeURL(environment.url.socket, environment.port.socket)}/serial`});

  private _isSerialConnected: boolean;

  constructor(aliveChecker: AliveCheckerService,
              private readonly _http: HttpClient) {
    this._isSerialConnected = false;
    aliveChecker.connectionStatus.subscribe((status: ConnectionStatus) => {
      if (status === ConnectionStatus.CONNECTED) {
        this._socket.connect();
      }
    });
    aliveChecker.disconnect.subscribe(() => {
      if (this._socket !== undefined) {
        this._socket.disconnect();
        this._isSerialConnected = false;
      }
    });
    this._socket.on('connect', () => {
      this.status();
    });
    this._socket.on('data', data => {
      this._rawData.next(data);
    });
    this._socket.on('status', data => {
      console.log(data);
      this._isSerialConnected = data.connected;
    });
  }

  /**
   * Vyšle požadavek pro získání všech dostupných seriových portů
   */
  public discover() {
    return this._http.get<{data: [{path: string}]}>(`${SerialService.BASE_API_URL}/discover`)
               .toPromise()
               .then(response => {
                 return response.data;
               });
  }

  /**
   * Otevře komunikační port na zadané cestě
   *
   * @param path Cesta, na které leží komunikační port
   */
  public open(path: string) {
    return this._http.post(`${SerialService.BASE_API_URL}/open`, {path})
               .toPromise();
  }

  /**
   * Uzavře seriový port a tím i ukončí komunikaci
   */
  public stop() {
    return this._http.patch(`${SerialService.BASE_API_URL}/stop`, null)
               .toPromise();
  }

  /**
   * Vyšle požadavek pro získání informaci o připojení seriového portu
   */
  public status() {
    this._http.get<ResponseObject<{connected: boolean}>>(`${SerialService.BASE_API_URL}/status`)
        .toPromise()
        .then(response => {
          this._isSerialConnected = response.data.connected;
        });
  }

  /**
   * Metoda slouží pro aktualizaci firmware STM
   *
   * @param firmware Binární soubor s firmware
   */
  public updateFirmware(firmware: Blob) {
    const formData = new FormData();
    formData.append('firmware', firmware);
    this._http.post(`${SerialService.BASE_API_URL}/firmware`, formData)
        .toPromise()
        .then(result => {
          console.log(result);
        });
  }

  /**
   * Getter indikující, zda-li je seriová linka připojena, či nikoliv
   */
  public get isSerialConnected() {
    return this._isSerialConnected;
  }
}
