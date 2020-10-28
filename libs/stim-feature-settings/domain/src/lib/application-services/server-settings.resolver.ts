import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { Actions, ofType } from '@ngrx/effects';

import { ServerSettings } from '../domain/settings';
import { SettingsFacade } from './settings.facade';
import * as SettingsActions from '../store/settings.actions';

@Injectable()
export class ServerSettingsResolver implements Resolve<ServerSettings> {
  constructor(private readonly actions$: Actions, private readonly _settings: SettingsFacade) {}

  resolve(): Observable<ServerSettings> | Promise<ServerSettings> | ServerSettings {
    return this._settings.state.pipe(
      take(1),
      switchMap(() => {
        this._settings.loadServerSettings();
        return this.actions$.pipe(
          // TODO catch fail
          ofType(SettingsActions.actionServerSettingsDone, SettingsActions.actionServerSettingsFail),
          // eslint-disable-next-line rxjs/no-unsafe-first
          take(1),
          map((action) => {
            return action && action.serverSettings ? action.serverSettings : {};
          })
        );
      })
    );
  }
}
