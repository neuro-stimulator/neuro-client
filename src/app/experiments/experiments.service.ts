import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';

import { environment} from '../../environments/environment';
import { Experiment } from 'diplomka-share';
import { BaseService } from '../share/base-service';

@Injectable({
  providedIn: 'root'
})
export class ExperimentsService extends BaseService<Experiment> {

  private static readonly BASE_API_URL = `${environment.makeURL(environment.url.server, environment.port.server)}/api/experiments`;

  constructor(protected readonly _http: HttpClient,
              protected readonly logger: NGXLogger) {
    super(ExperimentsService.BASE_API_URL, _http, logger);

    super._initSocket('experiments');
  }

}