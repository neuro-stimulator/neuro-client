import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NGXLogger } from 'ngx-logger';

import { ConnectionStatus, ResponseObject, StimulatorStateEvent } from '@stechy1/diplomka-share';

import { TOKEN_STIMULATOR_API_URL } from '@neuro-client/stim-lib-common';

@Injectable({
  providedIn: 'root',
})
export class StimulatorService {
  private readonly stimulatorURL = `${this.baseURL}/stimulator`;
  private readonly serialURL = `${this.baseURL}/serial`;

  constructor(@Inject(TOKEN_STIMULATOR_API_URL) private readonly baseURL, private readonly _http: HttpClient, private readonly logger: NGXLogger) {}

  /**
   * Vyšle požadavek pro získání všech dostupných seriových portů
   */
  public discover() {
    this.logger.info('Odesílám požadavek na získání všech dostupných sériových portů.');
    return this._http.get<{ data: [{ path: string }] }>(`${this.serialURL}/discover`);
  }

  /**
   * Otevře komunikační port na zadané cestě
   *
   * @param path Cesta, na které leží komunikační port
   */
  public open(path: string) {
    this.logger.info('Odesílám požadavek na otevření sériového portu.');
    return this._http.post<ResponseObject<void>>(`${this.serialURL}/open`, {
      path,
    });
  }

  /**
   * Uzavře seriový port a tím i ukončí komunikaci
   */
  public close() {
    this.logger.info('Odesílám požadavek na uzavření sériového portu.');
    return this._http.patch(`${this.serialURL}/stop`, null);
  }

  /**
   * Vyšle požadavek pro získání informaci o připojení seriového portu
   */
  public connectionStatus() {
    this.logger.info('Odesílám požadavek na získání informace o připojení sériového portu.');
    return this._http.get<ResponseObject<{ status: ConnectionStatus }>>(`${this.serialURL}/status`);
  }

  /**
   * Metoda slouží pro aktualizaci firmware STM
   *
   * @param path Relativní cesta k firmware stimulátoru
   */
  public updateFirmware(path: string) {
    this.logger.info('Odesílám požadavek na aktualizaci firmware stimulátoru.');
    return this._http.patch(`${this.stimulatorURL}/update-firmware`, { path });
  }

  public reboot() {
    this.logger.info('Odesílám požadavek na reboot stimulátoru.');
    return this._http.patch(`${this.stimulatorURL}/reboot`, null);
  }
  public stimulatorState() {
    this.logger.info('Odesílám požadavek na získání stavu stimulátoru.');
    return this._http.get<ResponseObject<StimulatorStateEvent | undefined>>(`${this.stimulatorURL}/state/?asyncStimulatorRequest=true`);
  }
  public experimentRun(experimentID: number) {
    this.logger.info('Odesílám požadavek na spuštění experimentu.');
    return this._http.patch(`${this.stimulatorURL}/experiment/run/${experimentID}/?asyncStimulatorRequest=true`, null);
  }
  public experimentPause(experimentID: number) {
    this.logger.info('Odesílám požadavek na pozastavení experimentu.');
    return this._http.patch(`${this.stimulatorURL}/experiment/pause/${experimentID}/?asyncStimulatorRequest=true`, null);
  }
  public experimentFinish(experimentID: number, force: boolean) {
    this.logger.info('Odesílám požadavek na ukončení experimentu.');
    return this._http.patch(`${this.stimulatorURL}/experiment/finish/${experimentID}/?asyncStimulatorRequest=true&force=${force}`, null);
  }
  public experimentUpload(id: number) {
    this.logger.info('Odesílám požadavek na nahrání experimentu.');
    return this._http.patch<{ message? }>(`${this.stimulatorURL}/experiment/upload/${id}/?asyncStimulatorRequest=true`, null);
  }
  public experimentSetup(id: number) {
    this.logger.info('Odesílám požadavek na inicializaici experimentu ve stimulátoru.');
    return this._http.patch<{ message? }>(`${this.stimulatorURL}/experiment/setup/${id}/?asyncStimulatorRequest=true`, null);
  }
  public experimentClear() {
    this.logger.info('Odesílám požadavek na vymazání experimentu ze stimulátoru.');
    return this._http.patch(`${this.stimulatorURL}/experiment/clear?asyncStimulatorRequest=true`, null);
  }

  public setOutput(index: number, enabled: boolean) {
    this.logger.info('Odesílám požadavek na nastavení jednoho výstupu.');
    return this._http.patch(`${this.stimulatorURL}/set-output?asyncStimulatorRequest=true`, { index, enabled });
  }
}
