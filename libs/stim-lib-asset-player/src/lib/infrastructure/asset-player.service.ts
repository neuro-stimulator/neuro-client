import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { NGXLogger } from 'ngx-logger';

import { ResponseObject } from '@stechy1/diplomka-share';

import { TOKEN_ASSET_PLAYER_API_URL } from '@diplomka-frontend/stim-lib-common';

@Injectable({
  providedIn: 'root',
})
export class AssetPlayerService {
  constructor(@Inject(TOKEN_ASSET_PLAYER_API_URL) private readonly apiURL: string, protected readonly _http: HttpClient, protected readonly logger: NGXLogger) {}

  public open(): Observable<ResponseObject<void>> {
    this.logger.info('Odesílám požadavek na otevření portu pro komunikaci s přehrávačem multimédií.');
    return this._http.patch<ResponseObject<void>>(`${this.apiURL}/open`, null);
  }

  public close(): Observable<ResponseObject<void>> {
    this.logger.info('Odesílám požadavek na zavření portu pro komunikaci s přehrávačem multimédií.');
    return this._http.patch<ResponseObject<void>>(`${this.apiURL}/close`, null);
  }

  public status(): Observable<ResponseObject<{ connected: boolean }>> {
    this.logger.info('Odesílám požadavek na získání stavu spojení s přehrávačem multimédií.');
    return this._http.get<ResponseObject<{ connected: boolean }>>(`${this.apiURL}/status`);
  }
}
