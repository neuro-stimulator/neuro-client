import { Injectable } from '@angular/core';

import { ResponseObject, ExperimentResult } from '@stechy1/diplomka-share';

import { BaseService } from '../share/base-service';
import { AliveCheckerService } from '../alive-checker.service';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { environment, makeURL } from '../../environments/environment';
import { IOEvent } from '../share/serial-data.event';

@Injectable({
  providedIn: 'root'
})
export class ExperimentResultsService extends BaseService<ExperimentResult> {

  private static readonly BASE_API_URL = `${makeURL(environment.url.server, environment.port.server)}/api/experiment-results`;

  constructor(aliveChecker: AliveCheckerService,
              protected readonly _http: HttpClient,
              protected readonly logger: NGXLogger) {
    super(ExperimentResultsService.BASE_API_URL, aliveChecker, _http, logger);

    super._initSocket('experiment-results');
  }

  /**
   * Získá ze serveru průběh experimentu
   *
   * @param experimentResult Experiment, pro který chci získat průběh
   */
  resultData(experimentResult: ExperimentResult) {
    return this._http.get<ResponseObject<IOEvent[]>>(`${ExperimentResultsService.BASE_API_URL}/result-data/${experimentResult.id}`)
               .toPromise()
               .then(result => {
                 return result.data;
               });
  }
}
