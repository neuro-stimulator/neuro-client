import { Injectable } from '@angular/core';

import { ExperimentResult } from 'diplomka-share';

import { BaseService } from '../share/base-service';
import { AliveCheckerService } from '../alive-checker.service';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperimentResultsService extends BaseService<ExperimentResult> {

  private static readonly BASE_API_URL = `${environment.makeURL(environment.url.server, environment.port.server)}/api/experiment-results`;

  constructor(aliveChecker: AliveCheckerService,
              protected readonly _http: HttpClient,
              protected readonly logger: NGXLogger) {
    super(ExperimentResultsService.BASE_API_URL, aliveChecker, _http, logger);
  }

  resultData(experimentResult: ExperimentResult) {
    return this._http.get(`${ExperimentResultsService.BASE_API_URL}/result-data/${experimentResult.id}`).toPromise();
  }
}
