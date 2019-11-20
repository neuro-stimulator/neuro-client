import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Experiment } from 'diplomka-share';

@Injectable({
  providedIn: 'root'
})
export class SequenceService {

  /**
   * Konstanta reprezentující výchozí URL adresu pro požadavky týkající se sekvencí
   */
  private static readonly BASE_API_URL = `${environment.makeURL(environment.url.server, environment.port.server)}/api/sequence`;

  constructor(private readonly _http: HttpClient) { }

  /**
   * Vygeneruje sekvenci pro zadaný experiment s odpovídající délkou
   *
   * @param experimentID ID experimentu, pro který se má sekvence vygenerovat
   * @param sequenceSize Délka sekvence
   */
  public generate(experimentID: number, sequenceSize: number) {
    return this._http.get<{experiment: Experiment, sequence: number[], analyse: any}>(`${SequenceService.BASE_API_URL}/new-for-experiment/${experimentID}/${sequenceSize}`)
               .toPromise();
  }
}
