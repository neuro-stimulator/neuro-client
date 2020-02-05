import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NGXLogger } from 'ngx-logger';

import { environment, makeURL } from '../../environments/environment';
import { BaseService } from '../share/base-service';
import { AliveCheckerService } from '../alive-checker.service';
import { Experiment, ResponseObject, Sequence } from '@stechy1/diplomka-share';

@Injectable({
  providedIn: 'root'
})
export class SequenceService extends BaseService<Sequence> {

  private static readonly BASE_API_URL = `${makeURL(environment.url.server, environment.port.server)}/api/sequences`;

  constructor(aliveChecker: AliveCheckerService,
              protected readonly _http: HttpClient,
              protected readonly logger: NGXLogger) {
    super(SequenceService.BASE_API_URL, aliveChecker, _http, logger);

    super._initSocket('sequences');
    this._socket.on('all', (records: Sequence[]) => {
      this._replaceData(records);
    });
  }

  public async generaceSequence(experimentId: number, size: number): Promise<number[]> {
    this._working.next(true);
    return this._http.get<ResponseObject<number[]>>(`${SequenceService.BASE_API_URL}/generate/${experimentId}/${size}`)
               .toPromise()
               .then(response => {
                 return response.data;
               })
               .finally(() => {
                 this._working.next(false);
               });
  }

  public async experimentsAsSequenceSource(): Promise<Experiment[]> {
    this._working.next(true);
    return this._http.get<ResponseObject<Experiment[]>>(`${SequenceService.BASE_API_URL}/experiments-as-sequence-source`)
               .toPromise()
               .then(response => {
                 return response.data;
               })
               .finally(() => {
                 this._working.next(false);
               });
  }

  public async forExperiment(experiment: Experiment): Promise<Sequence[]> {
    this._working.next(true);
    return this._http.get<ResponseObject<Sequence[]>>(`${SequenceService.BASE_API_URL}/for-experiment/${experiment.id}`)
               .toPromise()
               .then(response => {
                 return response.data;
               })
               .finally(() => {
                 this._working.next(false);
               });
  }

  public async fromNameAndSize(experimentId: number, name: string, size: number): Promise<Sequence> {
    const sequenceHelper: Sequence = {
      experimentId,
      name,
      size,
      created: new Date().getTime(),
      tags: [],
      data: [],
    };

    return this.insert(sequenceHelper);
  }
}
