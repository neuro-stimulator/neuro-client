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

  public async experimentStart() {
    return await this._http.patch(`${CommandsService.BASE_API_URL}/experiment/start`, null).toPromise();
  }

  public async experimentStop() {
    return await this._http.patch(`${CommandsService.BASE_API_URL}/experiment/stop`, null).toPromise();
  }

  public async experimentSetup(id: number) {
    await this._http.patch(`${CommandsService.BASE_API_URL}/experiment/setup/${id}`, null).toPromise();
    await this.experimentInit();
  }

  public async experimentInit() {
    return await this._http.patch(`${CommandsService.BASE_API_URL}/experiment/init`, null).toPromise();
  }

  public async experimentClear() {
    return await this._http.patch(`${CommandsService.BASE_API_URL}/experiment/clear`, null).toPromise();
  }

  // toggle-led/:index/:enabled
}
