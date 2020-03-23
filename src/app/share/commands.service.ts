import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment, makeURL } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {

  private static readonly BASE_API_URL = `${makeURL(environment.url.server, environment.port.server)}/api/commands`;

  constructor(private readonly _http: HttpClient) { }

  public async reboot() {
    return await this._http.patch(`${CommandsService.BASE_API_URL}/reboot`, null).toPromise();
  }

  public async setTime() {
    return await this._http.patch(`${CommandsService.BASE_API_URL}/time-set/${Date.now()}`, null).toPromise();
  }

  public async experimentRun(experimentID: number) {
    await this._http.patch(`${CommandsService.BASE_API_URL}/experiment/run/${experimentID}`, null).toPromise();
  }

  public async experimentPause(experimentID: number) {
    await this._http.patch(`${CommandsService.BASE_API_URL}/experiment/pause/${experimentID}`, null).toPromise();
  }

  public async experimentFinish(experimentID: number) {
    await this._http.patch(`${CommandsService.BASE_API_URL}/experiment/finish/${experimentID}`, null).toPromise();
  }

  public async experimentUpload(id: number) {
    const res = await this._http.patch<{message?}>(`${CommandsService.BASE_API_URL}/experiment/upload/${id}`, null).toPromise();
    if (res && res.message && res.message.type !== 0) {
      return;
    }
    await this.experimentSetup(id);
  }

  public async experimentSetup(id: number) {
    await this._http.patch<{message?}>(`${CommandsService.BASE_API_URL}/experiment/setup/${id}`, null).toPromise();
  }

  public async experimentClear() {
    const ret = await this._http.patch(`${CommandsService.BASE_API_URL}/experiment/clear`, null).toPromise();
  }

  // toggle-led/:index/:enabled
}
