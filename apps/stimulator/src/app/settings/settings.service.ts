import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject, Observable } from 'rxjs';

import { ResponseObject } from '@stechy1/diplomka-share';

import { environment, makeURL } from '../../environments/environment';
import { ServerSettings, Settings } from '../../../../../libs/stim-lib-common/src/lib/settings/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private static readonly SETTINGS_STORAGE_KEY = 'settings';
  private static readonly DEFAULT_SETTINGS: Settings = environment.settings;

  private static readonly BASE_API_URL = `${makeURL(environment.url.server, environment.port.server)}/api/settings`;

  private readonly _settingsChange: EventEmitter<Settings> = new EventEmitter<Settings>();
  public readonly settingsChange$: Observable<Settings> = this._settingsChange.asObservable();

  private readonly _working: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly working$: Observable<boolean> = this._working.asObservable();

  private _settings: Settings;

  constructor(private readonly _http: HttpClient,
              private readonly _storage: LocalStorageService) {
    this._loadSettings();
  }

  private _loadSettings() {
    this._settings = Object.assign(SettingsService.DEFAULT_SETTINGS, this._storage.get<Settings>(SettingsService.SETTINGS_STORAGE_KEY) || {});
    this._settingsChange.next(this._settings);
  }

  public async loadServerSettings(): Promise<ServerSettings> {
    return await this._http.get<ResponseObject<ServerSettings>>(SettingsService.BASE_API_URL)
                     .toPromise()
                     .catch(() => {
                       return {data: {}};
                     })
                     .then((response: ResponseObject<ServerSettings>) => {
                       return response.data;
                     });
  }

  public async uploadServerSettings(settings: ServerSettings) {
    await this._http.post(SettingsService.BASE_API_URL, settings).toPromise();
  }

  get settings(): Settings {
    return this._settings;
  }

  set settings(settings: Settings) {
    this._settings = settings;
    this._storage.set(SettingsService.SETTINGS_STORAGE_KEY, settings);
    this._settingsChange.next(settings);
  }

}
