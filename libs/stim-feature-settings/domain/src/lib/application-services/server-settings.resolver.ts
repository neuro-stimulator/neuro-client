import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Actions, ofType } from '@ngrx/effects';

import { ServerSettings } from '../domain/settings';
import { SettingsFacade } from './settings.facade';
import * as SettingsActions from '../store/settings.actions';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable()
export class ServerSettingsResolver implements Resolve<ServerSettings> {

  constructor(private readonly actions$: Actions,
              private readonly _settings: SettingsFacade) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ServerSettings> | Promise<ServerSettings> | ServerSettings {
    return this._settings.state.pipe(
      take(1),
      switchMap(() => {
        this._settings.loadServerSettings();
        return this.actions$.pipe(
          // TODO catch fail
          ofType(SettingsActions.actionServerSettingsDone, SettingsActions.actionServerSettingsFail),
          take(1),
          map(action => {
            // @ts-ignore
            return action?.serverSettings || {};
          })
        );
      })
    );
  }

}
