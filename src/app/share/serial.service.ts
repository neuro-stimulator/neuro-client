import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';

import { ResponseObject} from 'diplomka-share';

import { environment } from '../../environments/environment';
import { AliveCheckerService, ConnectionStatus } from '../alive-checker.service';
import { NavigationService } from '../navigation/navigation.service';
import { ConsoleService } from '../settings/console/console.service';
import { SerialDataEvent, StimulatorStateEvent } from './serial-data.event';

@Injectable({
  providedIn: 'root'
})
export class SerialService {

  /**
   * Konstanta reprezentující výchozí URL adresu pro požadavky týkající se seriové linky
   */
  private static readonly BASE_API_URL = `${environment.makeURL(environment.url.server, environment.port.server)}/api/low-level`;

  /**
   * Emitter pro přijatá data
   * Kdykoliv přijdou nějaká data ze serveru, tento emitter je pošle dál ke zpracování
   */
  private readonly _rawData: EventEmitter<SerialDataEvent> = new EventEmitter<SerialDataEvent>();
  public readonly rawData$: Observable<SerialDataEvent> = this._rawData.asObservable();

  /**
   * Socket pro komunikaci mezi WebServerem a Webovou aplikací
   */
  private readonly _socket = new Socket({url: `${environment.makeURL(environment.url.socket, environment.port.socket)}/serial`});

  private _isSerialConnected: boolean;

  constructor(aliveChecker: AliveCheckerService,
              private readonly navigation: NavigationService,
              private readonly console: ConsoleService,
              private readonly _http: HttpClient) {
    this._isSerialConnected = false;
    aliveChecker.connectionStatus.subscribe((status: ConnectionStatus) => {
      if (status === ConnectionStatus.CONNECTED) {
        this._socket.connect();
      }
    });
    aliveChecker.disconnect.subscribe(() => {
      if (this._socket !== undefined) {
        this._socket.disconnect();
        this._isSerialConnected = false;
        this._updateNavigationSubtitle();
      }
    });
    this._socket.on('connect', () => {
      this.status();
    });
    this._socket.on('data', (event: SerialDataEvent) => {
      this._rawData.next(event);
      if (event.name === 'EventStimulatorState') {
        this._handleStimulatorStateEvent(event as StimulatorStateEvent);
      }
    });
    this._socket.on('status', data => {
      if (this._isSerialConnected === data.connected) {
        return;
      }

      this._isSerialConnected = data.connected;
      this._updateNavigationSubtitle();
    });
  }

  // TODO odstranit duplikovaný kód
  private _handleStimulatorStateEvent(event: StimulatorStateEvent) {
    let text = '';
    switch (event.state) {
      // Experiment byl ukončen
      case 0x00:
        text = 'Experiment byl ukončen.';
        break;
      // Experiment byl spuštěn
      case 0x01:
        text = 'Experiment byl spuštěn.';
        break;
      // Experiment byl inicializován
      case 0x02:
        text = 'Experiment byl inicializován.';
        break;
      case 0x03:
        text = 'Konfigurace experimentů byla vymazána.';
        break;
    }

    this.console.saveCommand({date: new Date(event.timestamp), text});
  }

  private _updateNavigationSubtitle() {
    if (this._isSerialConnected) {
      this.navigation.subtitle = 'Připojeno';
      this.navigation.working = false;
      this.navigation.icon = 'fa-circle text-success';
      this.console.saveCommandRaw('Stimulátor byl připojen.');
    } else {
      this.navigation.subtitle = 'Odpojeno';
      this.navigation.working = false;
      this.navigation.icon = 'fa-circle text-danger';
      this.console.saveCommandRaw('Stimulátor byl odpojen.');
    }
  }

  /**
   * Vyšle požadavek pro získání všech dostupných seriových portů
   */
  public discover() {
    return this._http.get<{data: [{path: string}]}>(`${SerialService.BASE_API_URL}/discover`)
               .toPromise()
               .then(response => {
                 return response.data;
               });
  }

  /**
   * Otevře komunikační port na zadané cestě
   *
   * @param path Cesta, na které leží komunikační port
   */
  public open(path: string) {
    return this._http.post(`${SerialService.BASE_API_URL}/open`, {path})
               .toPromise()
               .then(() => {
                 this._isSerialConnected = true;
               });
  }

  /**
   * Uzavře seriový port a tím i ukončí komunikaci
   */
  public stop() {
    return this._http.patch(`${SerialService.BASE_API_URL}/stop`, null)
               .toPromise()
               .then(() => {
                  this._isSerialConnected = false;
                });
  }

  /**
   * Vyšle požadavek pro získání informaci o připojení seriového portu
   */
  public status() {
    this._http.get<ResponseObject<{connected: boolean}>>(`${SerialService.BASE_API_URL}/status`)
        .toPromise()
        .then(response => {
          this._isSerialConnected = response.data.connected;
          this._updateNavigationSubtitle();
        });
  }

  /**
   * Metoda slouží pro aktualizaci firmware STM
   *
   * @param firmware Binární soubor s firmware
   */
  public updateFirmware(firmware: Blob) {
    const formData = new FormData();
    formData.append('firmware', firmware);
    this._http.post(`${SerialService.BASE_API_URL}/firmware`, formData)
        .toPromise()
        .then(result => {
          console.log(result);
        });
  }

  /**
   * Getter indikující, zda-li je seriová linka připojena, či nikoliv
   */
  public get isSerialConnected() {
    return this._isSerialConnected;
  }

}
