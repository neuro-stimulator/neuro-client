import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NGXLogger } from 'ngx-logger';

import { ResponseObject } from '@stechy1/diplomka-share';

import { TOKEN_PLAYER_API_URL } from '@diplomka-frontend/stim-lib-common';
import { Observable } from 'rxjs';

@Injectable()
export class PlayerService {
  constructor(
    @Inject(TOKEN_PLAYER_API_URL) private readonly _accesPoint,
    private readonly _http: HttpClient,
    private readonly logger: NGXLogger
  ) {}

  prepareExperimentPlayer(
    id: number,
    options: any
  ): Observable<ResponseObject<any>> {
    this.logger.info(
      'Odesílám požadavek na připravení přehrávače experimentu..'
    );
    return this._http.post<ResponseObject<any>>(
      `${this._accesPoint}/prepare/${id}/0`,
      options
    );
  }
}
