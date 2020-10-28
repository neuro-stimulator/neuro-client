import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { SettingsState } from '../store/settings.state';
import { ServerSettings, Settings } from '../domain/settings';
import * as SettingsActions from '../store/settings.actions';
import * as fromSettings from '../store/settings.reducer';

@Injectable()
export class SettingsFacade {
  constructor(private readonly store: Store) {}

  public loadLocalSettings() {
    this.store.dispatch(SettingsActions.actionLocalSettingsRequest());
  }

  public invokeLocalSettings() {
    this.store.dispatch(SettingsActions.actionLocalSettingsInvoke());
  }

  public loadServerSettings() {
    this.store.dispatch(SettingsActions.actionServerSettingsRequest());
  }

  public invokeServerSettings() {
    this.store.dispatch(SettingsActions.actionServerSettingsInvoke());
  }

  public seedDatabase() {
    this.store.dispatch(SettingsActions.actionServerSeedDatabaseRequest());
  }

  public truncateDatabase() {
    this.store.dispatch(SettingsActions.actionServerTruncateDatabaseRequest());
  }

  set fragment(fragment: string) {
    this.store.dispatch(SettingsActions.actionSettingsChangeFragment({ fragment }));
  }

  set localSettings(settings: Settings) {
    this.store.dispatch(SettingsActions.actionSaveLocalSettingsRequest({ settings }));
  }

  set serverSettings(serverSettings: ServerSettings) {
    this.store.dispatch(SettingsActions.actionSaveServerSettingsRequest({ serverSettings }));
  }

  get state(): Observable<SettingsState> {
    return this.store.select(fromSettings.settingsFeature);
  }
}
