import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private static readonly BASE_API_URL = `${environment.makeURL(environment.url.server, environment.port.server)}/api/low-level`;

  constructor(private readonly _http: HttpClient) {}

  public discover() {
    return this._http.get(`${SettingsService.BASE_API_URL}/discover`).toPromise();
  }

  public stop() {
    return this._http.patch(`${SettingsService.BASE_API_URL}/stop`, null).toPromise();
  }
}
