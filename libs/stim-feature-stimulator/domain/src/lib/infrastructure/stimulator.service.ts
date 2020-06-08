import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseObject, StimulatorStateEvent } from "@stechy1/diplomka-share";

@Injectable({
  providedIn: 'root'
})
export class StimulatorService {

  private static readonly BASE_API_URL = ''/*`${makeURL(environment.url.server, environment.port.server)}/api/commands`*/;

  // private readonly _socket = new Socket({url: StimulatorService.BASE_API_URL});

  constructor(private readonly _http: HttpClient) { }

  /**
   * Vyšle požadavek pro získání všech dostupných seriových portů
   */
  public discover() {
    return this._http.get<{data: [{path: string}]}>(`${StimulatorService.BASE_API_URL}/discover`);
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
    return this._http.post<ResponseObject<any>>(`${StimulatorService.BASE_API_URL}/open`, {path});
               // .toPromise()
               // .then((response: ResponseObject<any>) => {
               //   this._isSerialConnected = response.message.code === MessageCodes.CODE_SUCCESS_LOW_LEVEL_PORT_OPPENED;
               // });
  }

  /**
   * Uzavře seriový port a tím i ukončí komunikaci
   */
  public close() {
    return this._http.patch(`${StimulatorService.BASE_API_URL}/stop`, null);
               // .toPromise()
               // .then(() => {
               //   this._isSerialConnected = false;
               // });
  }

  /**
   * Vyšle požadavek pro získání informaci o připojení seriového portu
   */
  public connectionStatus() {
    return this._http.get<ResponseObject<{connected: boolean}>>(`${StimulatorService.BASE_API_URL}/status`);
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
   * @param firmware Binární soubor s firmware
   */
  public updateFirmware(firmware: Blob) {
    const formData = new FormData();
    formData.append('firmware', firmware);
    return this._http.post(`${StimulatorService.BASE_API_URL}/firmware`, formData);
        // .toPromise()
        // .then((result) => {
        //   console.log(result);
        // });
  }


  public reboot() {
    return this._http.patch(`${StimulatorService.BASE_API_URL}/reboot`, null);
  }
  public stimulatorState() {
    return this._http.get<ResponseObject<StimulatorStateEvent|undefined>>(`${StimulatorService.BASE_API_URL}/stimulator-state`);
  }
  public experimentRun(experimentID: number) {
    return this._http.patch(`${StimulatorService.BASE_API_URL}/experiment/run/${experimentID}`, null);
  }
  public experimentPause(experimentID: number) {
    return this._http.patch(`${StimulatorService.BASE_API_URL}/experiment/pause/${experimentID}`, null);
  }
  public experimentFinish(experimentID: number) {
    return this._http.patch(`${StimulatorService.BASE_API_URL}/experiment/finish/${experimentID}`, null);
  }
  public experimentUpload(id: number) {
    return this._http.patch<{message?}>(`${StimulatorService.BASE_API_URL}/experiment/upload/${id}`, null);
  }
  public experimentSetup(id: number) {
    return this._http.patch<{message?}>(`${StimulatorService.BASE_API_URL}/experiment/setup/${id}`, null);
  }
  public experimentClear() {
   return this._http.patch(`${StimulatorService.BASE_API_URL}/experiment/clear`, null);
  }
}
