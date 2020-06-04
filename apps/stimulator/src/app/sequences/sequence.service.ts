import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NGXLogger } from 'ngx-logger';

import { environment, makeURL } from '../../environments/environment';
import { BaseService } from '../share/base-service';
import { Experiment, ResponseObject, Sequence } from '@stechy1/diplomka-share';
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SequenceService extends BaseService<Sequence> {

  private static readonly BASE_API_URL = `${makeURL(environment.url.server, environment.port.server)}/api/sequences`;

  constructor(protected readonly _http: HttpClient,
              protected readonly logger: NGXLogger) {
    super(SequenceService.BASE_API_URL, _http, logger);

    super._initSocket('sequences');
    this._socket.on('all', (records: Sequence[]) => {
      this._replaceData(records);
    });
  }

  public async generaceSequence(experimentId: number, size: number): Promise<number[]> {
    this._working.next(true);
    return this._http.get<ResponseObject<number[]>>(`${SequenceService.BASE_API_URL}/generate/${experimentId}/${size}`)
               .pipe(tap(() => {
                 this._working.next(false);
               }))
               .toPromise()
               .then((response: ResponseObject<number[]>) => {
                 return response.data;
               });
  }

  public async experimentsAsSequenceSource(): Promise<Experiment[]> {
    this._working.next(true);
    return this._http.get<ResponseObject<Experiment[]>>(`${SequenceService.BASE_API_URL}/experiments-as-sequence-source`)
               .pipe(tap(() => {
                 this._working.next(false);
               }))
               .toPromise()
               .then((response: ResponseObject<Experiment[]>) => {
                 return response.data;
               });
  }

  public async forExperiment(experiment: Experiment): Promise<Sequence[]> {
    this._working.next(true);
    return this._http.get<ResponseObject<Sequence[]>>(`${SequenceService.BASE_API_URL}/for-experiment/${experiment.id}`)
               .pipe(tap(() => {
                 this._working.next(false);
               }))
               .toPromise()
               .then((response: ResponseObject<Sequence[]>) => {
                 return response.data;
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

  public nameExists(name: string, experimentID?: number): Promise<boolean> {
    this.logger.info(`Odesílám požadavek pro otestování existence názvu sekvence: ${name}.`);
    return this._http.get<ResponseObject<{exists: boolean}>>(`${SequenceService.BASE_API_URL}/name-exists/${name}/${experimentID ?? 'new'}`)
               .toPromise()
               .then((result: ResponseObject<{exists: boolean}>) => {
                 this.logger.info(`Výsledek existence názvu sekvence: ${result.data.exists}.`);
                 return result.data.exists;
               });
  }
}
