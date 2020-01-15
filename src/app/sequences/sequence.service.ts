import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NGXLogger } from 'ngx-logger';

import { environment, makeURL } from '../../environments/environment';
import { BaseService } from '../share/base-service';
import { AliveCheckerService } from '../alive-checker.service';
import { Experiment, Sequence, ResponseObject } from '@stechy1/diplomka-share';

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

  private _analyseSequence(sequence: number[]) {
    const map = {};
    for (const value of sequence) {
      if (map[value] === undefined) {
        map[value] = {};
        map[value]['value'] = 1;
      } else {
        map[value]['value']++;
      }
    }

    for (const key of Object.keys(map)) {
      map[key]['percent'] = map[key]['value'] / sequence.length;
    }

    delete map['0'];
    return map;
  }

  oneWithAnalyse(recordId: number): Promise<{sequence: Sequence, analyse: {}}> {
    return super.one(recordId)
                .then(sequence => {
                  const analyse = this._analyseSequence(sequence.data);
                  return { sequence, analyse };
                });
  }

  public async generaceSequence(id: number, size: number): Promise<{ data: number[], analyse: {} }> {
    this._working.next(true);
    return this._http.get<ResponseObject<number[]>>(`${SequenceService.BASE_API_URL}/generate/${id}/${size}`)
               .toPromise()
               .then(response => {
                 const sequenceData = response.data;
                 const analyse = this._analyseSequence(sequenceData);
                 return {data: sequenceData, analyse};
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
}
