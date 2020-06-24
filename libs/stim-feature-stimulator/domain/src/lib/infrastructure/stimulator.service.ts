import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseObject, StimulatorStateEvent } from '@stechy1/diplomka-share';
import { TOKEN_STIMULATOR_API_URL } from '@diplomka-frontend/stim-lib-common';

@Injectable({
  providedIn: 'root',
})
export class StimulatorService {
  private readonly stimulatorURL = `${this.baseURL}/stimulator`;
  private readonly serialURL = `${this.baseURL}/serial`;

  constructor(
    @Inject(TOKEN_STIMULATOR_API_URL) private readonly baseURL,
    private readonly _http: HttpClient
  ) {}

  /**
   * Vyšle požadavek pro získání všech dostupných seriových portů
   */
  public discover() {
    return this._http.get<{ data: [{ path: string }] }>(
      `${this.serialURL}/discover`
    );
  }

  /**
   * Otevře komunikační port na zadané cestě
   *
   * @param path Cesta, na které leží komunikační port
   */
  public open(path: string) {
    return this._http.post<ResponseObject<any>>(`${this.serialURL}/open`, {
      path,
    });
  }

  /**
   * Uzavře seriový port a tím i ukončí komunikaci
   */
  public close() {
    return this._http.patch(`${this.serialURL}/stop`, null);
  }

  /**
   * Vyšle požadavek pro získání informaci o připojení seriového portu
   */
  public connectionStatus() {
    return this._http.get<ResponseObject<{ connected: boolean }>>(
      `${this.serialURL}/status`
    );
  }

  /**
   * Metoda slouží pro aktualizaci firmware STM
   *
   * @param path Relativní cesta k firmware stimulátoru
   */
  public updateFirmware(path: string) {
    return this._http.patch(`${this.stimulatorURL}/update-firmware`, { path });
  }

  public reboot() {
    return this._http.patch(`${this.stimulatorURL}/reboot`, null);
  }
  public stimulatorState() {
    return this._http.get<ResponseObject<StimulatorStateEvent | undefined>>(
      `${this.stimulatorURL}/state/?asyncStimulatorRequest=true`
    );
  }
  public experimentRun(experimentID: number) {
    return this._http.patch(
      `${this.stimulatorURL}/experiment/run/${experimentID}/?asyncStimulatorRequest=true`,
      null
    );
  }
  public experimentPause(experimentID: number) {
    return this._http.patch(
      `${this.stimulatorURL}/experiment/pause/${experimentID}/?asyncStimulatorRequest=true`,
      null
    );
  }
  public experimentFinish(experimentID: number) {
    return this._http.patch(
      `${this.stimulatorURL}/experiment/finish/${experimentID}/?asyncStimulatorRequest=true`,
      null
    );
  }
  public experimentUpload(id: number) {
    return this._http.patch<{ message? }>(
      `${this.stimulatorURL}/experiment/upload/${id}/?asyncStimulatorRequest=true`,
      null
    );
  }
  public experimentSetup(id: number) {
    return this._http.patch<{ message? }>(
      `${this.stimulatorURL}/experiment/setup/${id}/?asyncStimulatorRequest=true`,
      null
    );
  }
  public experimentClear() {
    return this._http.patch(`${this.stimulatorURL}/experiment/clear`, null);
  }
}
