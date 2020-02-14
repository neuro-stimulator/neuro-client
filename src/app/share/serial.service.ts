import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';

import { ResponseObject} from '@stechy1/diplomka-share';

import { environment, makeURL } from '../../environments/environment';
import { AliveCheckerService, ConnectionStatus } from '../alive-checker.service';
import { NavigationService } from '../navigation/navigation.service';
import { ConsoleService } from '../settings/console/console.service';
import { SerialDataEvent, StimulatorStateEvent } from './serial-data.event';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SerialService {

  /**
   * Konstanta reprezentující výchozí URL adresu pro požadavky týkající se seriové linky
   */
  private static readonly BASE_API_URL = `${makeURL(environment.url.server, environment.port.server)}/api/low-level`;

  private static readonly STATE_COMMAND_MAP = {
    0x00: 'CODE_SUCCESS_COMMANDS_STIMULATOR_READY',
    0x01: 'CODE_SUCCESS_COMMANDS_EXPERIMENT_UPLOAD',
    0x02: 'CODE_SUCCESS_COMMANDS_EXPERIMENT_SETUP',
    0x03: 'CODE_SUCCESS_COMMANDS_EXPERIMENT_START',
    0x04: 'CODE_SUCCESS_COMMANDS_EXPERIMENT_STOP',
    0x05: 'CODE_SUCCESS_COMMANDS_EXPERIMENT_CLEAR',
    0x11: 'CODE_SUCCESS_COMMANDS_EXPERIMENT_OUTPUT_UPLOAD',
    0x20: 'CODE_SUCCESS_COMMANDS_SEQUENCE_PART_UPLOAD',
  };

  /**
   * Emitter pro přijatá data
   * Kdykoliv přijdou nějaká data ze serveru, tento emitter je pošle dál ke zpracování
   */
  private readonly _rawData: EventEmitter<SerialDataEvent> = new EventEmitter<SerialDataEvent>();
  public readonly rawData$: Observable<SerialDataEvent> = this._rawData.asObservable();

  /**
   * Socket pro komunikaci mezi WebServerem a Webovou aplikací
   */
  private readonly _socket = new Socket({url: `${makeURL(environment.url.socket, environment.port.socket)}/serial`});

  private _isSerialConnected: boolean;

  public static getStimulatorStateTranslateValue(state: number) {
    return `SERVER_MESSAGE_CODES.${SerialService.STATE_COMMAND_MAP[state]}` || 'CODE_ERROR_COMMANDS_UNKNOWN';
  }

  constructor(aliveChecker: AliveCheckerService,
              private readonly navigation: NavigationService,
              private readonly console: ConsoleService,
              private readonly translator: TranslateService,
              private readonly _http: HttpClient) {
    this._isSerialConnected = false;
    this._updateNavigationSubtitle(false);
    aliveChecker.connectionStatus.subscribe((status: ConnectionStatus) => {
      if (status === ConnectionStatus.CONNECTED) {
        this._socket.connect();
      }
    });
    aliveChecker.disconnect.subscribe(() => {
      if (this._socket !== undefined) {
        this._socket.disconnect();
        if (this._isSerialConnected) {
          this._isSerialConnected = false;
          this._updateNavigationSubtitle();
        }
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

  private _handleStimulatorStateEvent(event: StimulatorStateEvent) {
    const key = SerialService.getStimulatorStateTranslateValue(event.state);
    this.translator.get(key)
        .toPromise()
        .then((text: string) => {
          this.console.saveCommand({date: new Date(), text});
        });
  }

  private _updateNavigationSubtitle(saveCommand: boolean = true) {
    if (this._isSerialConnected) {
      this.navigation.subtitle = 'SHARE.SERIAL.STATUS_CONNECTED';
      this.navigation.working = false;
      this.navigation.icon = 'fa-circle text-success';
      if (saveCommand) {
        this.console.saveCommandRaw('SHARE.SERIAL.MESSAGES.STIMULATOR_WAS_CONNECTED');
      }
    } else {
      this.navigation.subtitle = 'SHARE.SERIAL.STATUS_DISCONNECTED';
      this.navigation.working = false;
      this.navigation.icon = 'fa-circle text-danger';
      if (saveCommand) {
        this.console.saveCommandRaw('SHARE.SERIAL.MESSAGES.STIMULATOR_WAS_DISCONNECTED');
      }
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
          if (this._isSerialConnected === response.data.connected) {
            return;
          }

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
