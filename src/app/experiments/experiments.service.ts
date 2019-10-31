import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';

import { environment} from '../../environments/environment';
import { Experiment } from 'diplomka-share';
import { BaseService } from '../share/base-service';
import { AliveCheckerService } from '../alive-checker.service';

@Injectable({
  providedIn: 'root'
})
export class ExperimentsService extends BaseService<Experiment> {

  private static readonly BASE_API_URL = `${environment.makeURL(environment.url.server, environment.port.server)}/api/experiments`;

  constructor(aliveChecker: AliveCheckerService,
              protected readonly _http: HttpClient,
              protected readonly logger: NGXLogger) {
    super(ExperimentsService.BASE_API_URL, aliveChecker, _http, logger);

    super._initSocket('experiments');
    this._socket.on('all', (records: Experiment[]) => {
      this._replaceData(records);
    });
  }

}
