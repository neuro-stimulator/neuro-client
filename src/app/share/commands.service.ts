import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {

  private static readonly BASE_API_URL = `${environment.makeURL(environment.url.server, environment.port.server)}/api/commands`;

  constructor(private readonly _http: HttpClient) { }

  public async reboot() {
    return await this._http.patch(`${CommandsService.BASE_API_URL}/reboot`, null).toPromise();
  }

  public async setTime() {
    return await this._http.patch(`${CommandsService.BASE_API_URL}/time-set/${Date.now()}`, null).toPromise();
  }

  public async experimentStart(experimentID: number) {
    await this._http.patch(`${CommandsService.BASE_API_URL}/experiment/start/${experimentID}`, null).toPromise();
  }

  public async experimentStop(experimentID: number) {
    await this._http.patch(`${CommandsService.BASE_API_URL}/experiment/stop/${experimentID}`, null).toPromise();
  }

  public async experimentSetup(id: number) {
    const res = await this._http.patch(`${CommandsService.BASE_API_URL}/experiment/setup/${id}`, null).toPromise();
    if (res && res.message && res.message.type !== 0) {
      return;
    }
    await this.experimentInit();
  }

  public async experimentInit() {
    await this._http.patch(`${CommandsService.BASE_API_URL}/experiment/init`, null).toPromise();
  }

  public async experimentClear() {
    const ret = await this._http.patch(`${CommandsService.BASE_API_URL}/experiment/clear`, null).toPromise();
    console.log(ret);
  }

  // toggle-led/:index/:enabled
}
