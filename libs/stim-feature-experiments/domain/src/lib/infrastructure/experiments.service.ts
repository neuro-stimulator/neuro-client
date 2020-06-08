import { Inject, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { NGXLogger } from 'ngx-logger';

import { Experiment, ResponseObject } from '@stechy1/diplomka-share';
import { BaseService, TOKEN_EXPERIMENTS_API_URL } from "@diplomka-frontend/stim-lib-common";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExperimentsService extends BaseService<Experiment> {

  // public static readonly BASE_API_URL = ''/*`${makeURL(environment.url.server, environment.port.server)}/api/experiments`*/;

  constructor(@Inject(TOKEN_EXPERIMENTS_API_URL) apiURL: string,
              protected readonly _http: HttpClient,
              protected readonly logger: NGXLogger) {
    super(apiURL, _http, logger);

    // super._initSocket('experiments');
    // this._socket.on('all', (records: Experiment[]) => {
    //   this._replaceData(records);
    // });
  }

  // protected _socketConnected() {
  //   super._socketConnected();
  //   this._socket.emit('all');
  // }

  // public install(experimentID: number, sequence: number[], onProgress: (progress: number) => void) {
    // return new Promise((resolve) => {
    //   this._socket.on('progress', (data: {progress: number}) => {
    //     onProgress(data.progress);
    //     if (data.progress >= 100) {
    //       resolve();
    //     }
    //   });
    //   this._socket.emit('install-experiment', {id: experimentID, sequence});
    // });
  // }

  public nameExists(name: string, experimentID?: number): Observable<ResponseObject<{ exists: boolean }>> {
    this.logger.info(`Odesílám požadavek pro otestování existence názvu experimentu: ${name}.`);
    return this._http.get<ResponseObject<{exists: boolean}>>(`${this._accessPoint}/name-exists/${name}/${experimentID ?? 'new'}`)
               // .toPromise()
               // .then((result: ResponseObject<{exists: boolean}>) => {
               //   this.logger.info(`Výsledek existence názvu experimentu: ${result.data.exists}.`);
               //   return result.data.exists;
               // });
  }
}
