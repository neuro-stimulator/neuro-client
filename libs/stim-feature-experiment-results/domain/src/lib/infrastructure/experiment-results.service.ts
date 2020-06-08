import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NGXLogger } from 'ngx-logger';

import { ExperimentResult, IOEvent, ResponseObject } from '@stechy1/diplomka-share';

import { BaseService } from "@diplomka-frontend/stim-lib-common";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExperimentResultsService extends BaseService<ExperimentResult> {

  private static readonly BASE_API_URL = ''/*`${makeURL(environment.url.server, environment.port.server)}/api/experiment-results`*/;

  constructor(protected readonly _http: HttpClient,
              protected readonly logger: NGXLogger) {
    super(ExperimentResultsService.BASE_API_URL, _http, logger);

    // super._initSocket('experiment-results');
  }

  /**
   * Získá ze serveru průběh experimentu
   *
   * @param experimentResult Experiment, pro který chci získat průběh
   */
  resultData(experimentResult: ExperimentResult): Observable<ResponseObject<IOEvent[]>> {
    return this._http.get<ResponseObject<IOEvent[]>>(`${this.dataLink}${experimentResult.id}`)
               // .toPromise()
               // .then((result: ResponseObject<IOEvent[]>) => {
               //   return result.data;
               // });
  }

  /**
   * Vrátí adresu na které se nachází data experimentu.
   */
  get dataLink(): string {
    return ExperimentResultsService.BASE_API_URL + /result-data/;
  }
}
