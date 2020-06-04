import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Socket } from 'ngx-socket-io';

import { Experiment } from '@stechy1/diplomka-share';

import { environment, makeURL } from '../../environments/environment';
import { AliveCheckerService, ConnectionStatus } from '../alive-checker.service';

@Injectable({
  providedIn: 'root'
})
export class SequenceService {

  /**
   * Konstanta reprezentující výchozí URL adresu pro požadavky týkající se sekvencí
   */
  private static readonly BASE_API_URL = `${makeURL(environment.url.server, environment.port.server)}/api/sequence`;

  /**
   * Socket pro komunikaci mezi WebServerem a Webovou aplikací
   */
  private readonly _socket = new Socket({url: `${makeURL(environment.url.socket, environment.port.server)}/sequence`});

  constructor(aliveChecker: AliveCheckerService,
              private readonly _http: HttpClient) {

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
  }

  /**
   * Vygeneruje sekvenci pro zadaný experiment s odpovídající délkou
   *
   * @param experimentID ID experimentu, pro který se má sekvence vygenerovat
   * @param sequenceSize Délka sekvence
   * @param onProgress Zavolá se pro aktualizaci progresu při generování sekvence
   */
  public generate(experimentID: number, sequenceSize: number, onProgress: (progress: number) => void) {
    return new Promise((resolve) => {
      this._socket.on('progress', (data: {progress: number}) => {
        onProgress(data.progress);
      });
      this._socket.on('new-for-experiment', (data: {experiment: Experiment, sequence: number[], analyse: any}) => {
        resolve(data);
      });
      this._socket.emit('new-for-experiment', {id: experimentID, sequenceSize});
    });
  }
}
