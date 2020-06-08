import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Store } from "@ngrx/store";

import { SettingsState } from "../store/settings.state";
import * as SettingsActions from '../store/settings.actions';
import * as fromSettings from '../store/settings.reducer';

@Injectable()
export class SettingsFacade {

  constructor(private readonly store: Store<SettingsState>) {}

  public loadLocalSettings() {
    this.store.dispatch(SettingsActions.actionLocalSettingsRequest({}));
  }

  public loadServerSettings() {
    this.store.dispatch(SettingsActions.actionLocalSettingsRequest({}));
  }

  get state(): Observable<SettingsState> {
    // @ts-ignore
    return this.store.select(fromSettings.settingsReducerKey);
  }

}
