import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { deserializeRequest } from '@diplomka-frontend/stim-lib-common';

import { DelayResponse } from '../domain/delay-response';

@Injectable({
  providedIn: 'root',
})
export class DelayRequestStorage {

  private readonly delayResponseQueue: DelayResponse[] = [];

  constructor(private readonly _http: HttpClient) {}

  public pushDelayResponse(res: DelayResponse) {
    this.delayResponseQueue.push(res);
  }

  public notifyDelayResponse(res) {
    const delayResponse = this.delayResponseQueue.pop();
    delayResponse.emit(res);
  }

  public callRequest(serializedRequest: string) {
    return this._http.request(deserializeRequest(serializedRequest));
  }
}
