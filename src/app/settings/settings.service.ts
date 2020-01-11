import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Settings } from './settings';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private static readonly SETTINGS_STORAGE_KEY = 'settings';
  private static readonly DEFAULT_SETTINGS: Settings = environment.settings;

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
    this._settings = this._storage.get<Settings>(SettingsService.SETTINGS_STORAGE_KEY) || SettingsService.DEFAULT_SETTINGS;
    this._settingsChange.next(this._settings);
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
