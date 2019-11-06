import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../environments/environment';
import { AliveCheckerService, ConnectionStatus } from '../alive-checker.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SerialService {

  private readonly _rawData: EventEmitter<any> = new EventEmitter<any>();
  public readonly rawData$: Observable<any> = this._rawData.asObservable();

  private readonly _socket = new Socket({url: `${environment.makeURL(environment.url.socket, environment.port.socket)}/serial`});

  constructor(aliveChecker: AliveCheckerService) {
    aliveChecker.connectionStatus.subscribe((status: ConnectionStatus) => {
      if (status === ConnectionStatus.CONNECTED) {
        this._socket.connect();
      }
    });
    aliveChecker.disconnect.subscribe(() => {
      if (this._socket !== undefined) {
        this._socket.disconnect();
      }
    });
    this._socket.on('data', data => {
      this._rawData.next(data);
    });
  }
}
