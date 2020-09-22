import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NGXLogger } from 'ngx-logger';

import {
  ExperimentResult,
  IOEvent,
  ResponseObject,
} from '@stechy1/diplomka-share';

import {
  BaseService,
  TOKEN_EXPERIMENT_RESULTS_API_URL,
} from '@diplomka-frontend/stim-lib-common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExperimentResultsService extends BaseService<ExperimentResult> {
  constructor(
    @Inject(TOKEN_EXPERIMENT_RESULTS_API_URL) apiURL: string,
    protected readonly _http: HttpClient,
    protected readonly logger: NGXLogger
  ) {
    super(apiURL, _http, logger);
  }

  /**
   * Získá ze serveru průběh experimentu
   *
   * @param experimentResult Experiment, pro který chci získat průběh
   */
  resultData(
    experimentResult: ExperimentResult
  ): Observable<ResponseObject<IOEvent[]>> {
    this.logger.info('Odesílám požadavek na získání dat výsledku experimentu.');
    return this._http.get<ResponseObject<IOEvent[]>>(
      `${this.dataLink}${experimentResult.id}`
    );
  }

  public nameExists(
    name: string,
    experimentResultID?: number
  ): Observable<ResponseObject<{ exists: boolean }>> {
    this.logger.info(
      `Odesílám požadavek pro otestování existence názvu experimentu: ${name}.`
    );
    return this._http.get<ResponseObject<{ exists: boolean }>>(
      `${this._accessPoint}/name-exists/${name}/${experimentResultID ?? 'new'}`
    );
  }

  /**
   * Vrátí adresu na které se nachází data experimentu.
   */
  get dataLink(): string {
    return this._accessPoint + /result-data/;
  }
}
