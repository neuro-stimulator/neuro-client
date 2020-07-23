import { Inject, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs';

import { ResponseObject } from '@stechy1/diplomka-share';
import { TOKEN_SETTINGS_API_URL } from "@diplomka-frontend/stim-lib-common";

import { ServerSettings, Settings } from "../..";
import { NGXLogger } from 'ngx-logger';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private static readonly SETTINGS_STORAGE_KEY = 'settings';
  // private static readonly DEFAULT_SETTINGS: Settings = environment.settings;

  // private static readonly BASE_API_URL = `${makeURL(environment.url.server, environment.port.server)}/api/settings`;

  // private readonly _settingsChange: EventEmitter<Settings> = new EventEmitter<Settings>();
  // public readonly settingsChange$: Observable<Settings> = this._settingsChange.asObservable();

  // private readonly _working: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // public readonly working$: Observable<boolean> = this._working.asObservable();

  // private _settings: Settings;

  constructor(@Inject(TOKEN_SETTINGS_API_URL) private readonly apiURL: string,
              private readonly _http: HttpClient,
              private readonly _storage: LocalStorageService,
              private readonly logger: NGXLogger) {
  }

  public loadLocalSettings(): Settings {
    this.logger.info('Načítám lokální nastavení aplikace...')
    return this._storage.get<Settings>(SettingsService.SETTINGS_STORAGE_KEY);
  }

  public saveLocalSettings(settings: Settings): void {
    this.logger.info("Ukládám lokální nastavení aplikace...")
    this._storage.set(SettingsService.SETTINGS_STORAGE_KEY, settings);
  }

  public loadServerSettings(): Observable<ResponseObject<ServerSettings>> {
    this.logger.info('Odesílám požadavek pro získání uživatelského nastavení na serveru...');
    return this._http.get<ResponseObject<ServerSettings>>(this.apiURL);
  }

  public saveServerSettings(settings: ServerSettings): Observable<ResponseObject<ServerSettings>> {
    this.logger.info("Odesílám požadavek pro uložení uživatelského nastavení na serveru...")
    return this._http.post<ResponseObject<any>>(this.apiURL, settings);
  }

  // private _loadSettings() {
  //   this._settings = Object.assign(SettingsService.DEFAULT_SETTINGS, this._storage.get<Settings>(SettingsService.SETTINGS_STORAGE_KEY) || {});
  //   this._settingsChange.next(this._settings);
  // }
  //
  // public async loadServerSettings(): Promise<ServerSettings> {
  //   return await this._http.get<ResponseObject<ServerSettings>>(SettingsService.BASE_API_URL)
  //                    .toPromise()
  //                    .catch(() => {
  //                      return {data: {}};
  //                    })
  //                    .then((response: ResponseObject<ServerSettings>) => {
  //                      return response.data;
  //                    });
  // }
  //
  // public async uploadServerSettings(settings: ServerSettings) {
  //   await this._http.post(SettingsService.BASE_API_URL, settings).toPromise();
  // }

  // get settings(): Settings {
  //   return this._settings;
  // }
  //
  // set settings(settings: Settings) {
  //   this._settings = settings;
  //   this._storage.set(SettingsService.SETTINGS_STORAGE_KEY, settings);
  //   this._settingsChange.next(settings);
  // }

}
