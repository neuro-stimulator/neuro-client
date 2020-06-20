import { Inject, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ResponseObject, StimulatorStateEvent } from "@stechy1/diplomka-share";
import { TOKEN_STIMULATOR_API_URL } from "@diplomka-frontend/stim-lib-common";

@Injectable({
  providedIn: 'root'
})
export class StimulatorService {

  private readonly stimulatorURL = `${this.baseURL}/stimulator`;
  private readonly serialURL = `${this.baseURL}/serial`;

  constructor(@Inject(TOKEN_STIMULATOR_API_URL) private readonly baseURL,
              private readonly _http: HttpClient) { }

  /**
   * Vyšle požadavek pro získání všech dostupných seriových portů
   */
  public discover() {
    return this._http.get<{data: [{path: string}]}>(`${this.serialURL}/discover`);
               // .toPromise()
               // .then((response: {data: [{path: string}]}) => {
               //   return response.data;
               // });
  }

  /**
   * Otevře komunikační port na zadané cestě
   *
   * @param path Cesta, na které leží komunikační port
   */
  public open(path: string) {
    return this._http.post<ResponseObject<any>>(`${this.serialURL}/open`, {path});
               // .toPromise()
               // .then((response: ResponseObject<any>) => {
               //   this._isSerialConnected = response.message.code === MessageCodes.CODE_SUCCESS_LOW_LEVEL_PORT_OPPENED;
               // });
  }

  /**
   * Uzavře seriový port a tím i ukončí komunikaci
   */
  public close() {
    return this._http.patch(`${this.serialURL}/stop`, null);
               // .toPromise()
               // .then(() => {
               //   this._isSerialConnected = false;
               // });
  }

  /**
   * Vyšle požadavek pro získání informaci o připojení seriového portu
   */
  public connectionStatus() {
    return this._http.get<ResponseObject<{connected: boolean}>>(`${this.serialURL}/status`);
        // .toPromise()
        // .then((response: ResponseObject<{connected: boolean}>) => {
        //   if (this._isSerialConnected === response.data.connected) {
        //     return;
        //   }
        //
        //   this._isSerialConnected = response.data.connected;
        //   this._updateNavigationSubtitle();
        // });
  }

  /**
   * Metoda slouží pro aktualizaci firmware STM
   *
   * @param path Relativní cesta k firmware stimulátoru
   */
  public updateFirmware(path: string) {
    return this._http.patch(`${this.stimulatorURL}/update-firmware`, { path });
        // .toPromise()
        // .then((result) => {
        //   console.log(result);
        // });
  }


  public reboot() {
    return this._http.patch(`${this.stimulatorURL}/reboot`, null);
  }
  public stimulatorState() {
    return this._http.get<ResponseObject<StimulatorStateEvent|undefined>>(`${this.stimulatorURL}/stimulator-state`);
  }
  public experimentRun(experimentID: number) {
    return this._http.patch(`${this.stimulatorURL}/experiment/run/${experimentID}`, null);
  }
  public experimentPause(experimentID: number) {
    return this._http.patch(`${this.stimulatorURL}/experiment/pause/${experimentID}`, null);
  }
  public experimentFinish(experimentID: number) {
    return this._http.patch(`${this.stimulatorURL}/experiment/finish/${experimentID}`, null);
  }
  public experimentUpload(id: number) {
    return this._http.patch<{message?}>(`${this.stimulatorURL}/experiment/upload/${id}`, null);
  }
  public experimentSetup(id: number) {
    return this._http.patch<{message?}>(`${this.stimulatorURL}/experiment/setup/${id}`, null);
  }
  public experimentClear() {
   return this._http.patch(`${this.stimulatorURL}/experiment/clear`, null);
  }
}
