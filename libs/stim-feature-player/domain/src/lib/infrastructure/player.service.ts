import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

import { PlayerConfiguration, ResponseObject } from '@stechy1/diplomka-share';

import { TOKEN_PLAYER_API_URL } from '@diplomka-frontend/stim-lib-common';

@Injectable()
export class PlayerService {
  constructor(
    @Inject(TOKEN_PLAYER_API_URL) private readonly _accesPoint,
    private readonly _http: HttpClient,
    private readonly logger: NGXLogger
  ) {}

  prepareExperimentPlayer(
    id: number,
    options: PlayerConfiguration
  ): Observable<ResponseObject<any>> {
    this.logger.info(
      'Odesílám požadavek na připravení přehrávače experimentu...'
    );
    return this._http.post<ResponseObject<any>>(
      `${this._accesPoint}/prepare/${id}`,
      options
    );
  }

  getPlayerState(): Observable<ResponseObject<any>> {
    this.logger.info(
      'Odesílám požadavek na získání aktuálního stavu přehrávače experimentu...'
    );
    return this._http.get(`${this._accesPoint}/state`);
  }
}
