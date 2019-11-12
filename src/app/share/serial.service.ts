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

  private static readonly BASE_API_URL = `${environment.makeURL(environment.url.server, environment.port.server)}/api/low-level`;

  private readonly _rawData: EventEmitter<any> = new EventEmitter<any>();
  public readonly rawData$: Observable<any> = this._rawData.asObservable();

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

  public discover() {
    return this._http.get<{data: [{path: string}]}>(`${SerialService.BASE_API_URL}/discover`)
               .toPromise()
               .then(response => {
                 return response.data;
               });
  }

  public open(path: string) {
    return this._http.post(`${SerialService.BASE_API_URL}/open`, {path})
               .toPromise();
  }

  public stop() {
    return this._http.patch(`${SerialService.BASE_API_URL}/stop`, null)
               .toPromise();
  }

  public status() {
    this._http.get<ResponseObject<{connected: boolean}>>(`${SerialService.BASE_API_URL}/status`)
        .toPromise()
        .then(response => {
          this._isSerialConnected = response.data.connected;
        });
  }

  public get isSerialConnected() {
    return this._isSerialConnected;
  }
}
