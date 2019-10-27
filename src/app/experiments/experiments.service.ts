import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../share/base-service';
import { Experiment } from 'diplomka-share';
import { SERVER_BASE_URL } from '../share/server-base';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class ExperimentsService extends BaseService<Experiment> {

  private static readonly BASE_API_URL = `${SERVER_BASE_URL}/api/experiments`;

  constructor(protected readonly _http: HttpClient,
              protected readonly logger: NGXLogger) {
    super(ExperimentsService.BASE_API_URL, _http, logger);
  }

}
