import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { NGXLogger } from 'ngx-logger';

import {
  Experiment,
  Output,
  ResponseObject,
  Sequence,
} from '@stechy1/diplomka-share';

import {
  BaseService,
  TOKEN_SEQUENCES_API_URL,
} from '@neuro-client/stim-lib-common';

@Injectable({
  providedIn: 'root',
})
export class SequencesService extends BaseService<Sequence> {
  constructor(
    @Inject(TOKEN_SEQUENCES_API_URL) apiURL: string,
    protected readonly _http: HttpClient,
    protected readonly logger: NGXLogger
  ) {
    super(apiURL, _http, logger);
  }

  /**
   * Odešle příkaz na server na vygenerování nové sekvence
   *
   * @param experimentId ID experimentu, ze kterého se budou brát parametry
   * @param size Délka sekvence
   */
  public generaceSequence(
    experimentId: number,
    size: number
  ): Observable<ResponseObject<number[]>> {
    this.logger.info('Odesílám požadavek na vygenerování nové sekvence.');
    return this._http.get<ResponseObject<number[]>>(
      `${this._accessPoint}/generate/${experimentId}/${size}`
    );
  }

  /**
   * Vrátí kolekci experimentů, které podporují sekvence
   */
  public experimentsAsSequenceSource(): Observable<
    ResponseObject<Experiment<Output>[]>
  > {
    this.logger.info(
      'Odesílám požadavek na získání všech experimentů, které podporují sekvence.'
    );
    return this._http.get<ResponseObject<Experiment<Output>[]>>(
      `${this._accessPoint}/experiments-as-sequence-source`
    );
  }

  /**
   * Vrátí všechny sekvence vygenerované na základě zadaného experimentu.
   *
   * @param experiment Experiment, pro který se mají nalézt všechny sekvence
   */
  public forExperiment(
    experiment: Experiment<Output>
  ): Observable<ResponseObject<Sequence[]>> {
    return this._http.get<ResponseObject<Sequence[]>>(
      `${this._accessPoint}/for-experiment/${experiment.id}`
    );
  }

  /**
   * Zjednodušené generování sekvence na základě ID expeirmentu,
   * názvu a délky sekvence
   *
   * @param experimentId ID experimentu
   * @param name Název nové sekvence
   * @param size Velkost sekvence
   */
  public fromNameAndSize(
    experimentId: number,
    name: string,
    size: number
  ): Observable<ResponseObject<Sequence>> {
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

  /**
   * Otestuje, zdali název existuje, či nikoliv
   *
   * @param name Testovaný název
   * @param sequenceID ID sekvence, nebo prázdná hodnota pro novou sekvenci
   */
  public nameExists(
    name: string,
    sequenceID?: number
  ): Observable<ResponseObject<{ exists: boolean }>> {
    this.logger.info('Odesílám požadavek na ověření existence názvu sekvence.');
    return this._http.get<ResponseObject<{ exists: boolean }>>(
      `${this._accessPoint}/name-exists/${name}/${sequenceID ?? 'new'}`
    );
  }
}
