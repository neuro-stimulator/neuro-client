import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NGXLogger } from 'ngx-logger';

import { Experiment, Output, ResponseObject, Sequence } from '@stechy1/diplomka-share';
import { BaseService, TOKEN_EXPERIMENTS_API_URL } from '@neuro-client/stim-lib-common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExperimentsService extends BaseService<Experiment<Output>> {
  constructor(@Inject(TOKEN_EXPERIMENTS_API_URL) apiURL: string, protected readonly _http: HttpClient, protected readonly logger: NGXLogger) {
    super(apiURL, _http, logger);
  }

  public nameExists(name: string, experimentID?: number): Observable<ResponseObject<{ exists: boolean }>> {
    this.logger.info(`Odesílám požadavek pro otestování existence názvu experimentu: ${name}.`);
    return this._http.get<ResponseObject<{ exists: boolean }>>(`${this._accessPoint}/name-exists/${name}/${experimentID ?? 'new'}`);
  }

  public sequencesForExperiment(experiment: Experiment<Output>) {
    this.logger.info('Odesílám požadavek pro získání všech sekvencí vygenerovaných pro zadaný experiment.');
    return this._http.get<ResponseObject<Sequence[]>>(`${this._accessPoint}/sequences-for-experiment/${experiment.id}`);
  }

  public sequenceFromExperiment(experimentID: number, name: string, size: number) {
    this.logger.info('Odesílám požadavek na rychlé vygenerování sekvence za pomoci názvu a délky.');
    return this._http.get(`${this._accessPoint}/sequence-from-experiment/${experimentID}/${name}/${size}`);
  }

  public setOutputSynchronization(synchronize: boolean, experimentID?: number): Observable<ResponseObject<void>> {
    this.logger.info('Odesílám požadavek pro nastavení synchronizace výstupů mezi editorem výstupů a přehrávačem multimédií.');
    let request = `${this._accessPoint}/set-output-synchronization?synchronize=${synchronize}`;
    if (experimentID) {
      request += `&experimentID=${experimentID}`;
    }
    return this._http.patch<ResponseObject<void>>(request, null);
  }
}
