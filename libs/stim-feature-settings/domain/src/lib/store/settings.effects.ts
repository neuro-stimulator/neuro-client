import { Injectable } from "@angular/core";

import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from "rxjs";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';

import { ResponseObject } from "@stechy1/diplomka-share";

import { SettingsState } from '@diplomka-frontend/stim-feature-settings/domain';

import { SettingsService } from "../infrastructure/settings.service";
import { ServerSettings, Settings } from "../domain/settings";
import * as SettingsActions from './settings.actions';

@Injectable()
export class SettingsEffects {
  constructor(private readonly settings: SettingsService,
              private readonly actions$: Actions,
              private readonly store: Store<SettingsState>) {}

  localSettings$ = createEffect(() => this.actions$.pipe(
    ofType(SettingsActions.actionLocalSettingsRequest),
    // @ts-ignore
    withLatestFrom(this.store.select("settings")),
    tap(([action, settings]) => { console.log(settings); }),
    // @ts-ignore
    filter(([action, settings]) => !settings.localSettingsLoaded),
    switchMap((action) => {
      return of(this.settings.loadLocalSettings()).pipe(
        map((settings: Settings) => {
          if (settings) {
            return SettingsActions.actionLocalSettingsDone({settings});
          } else {
            return SettingsActions.actionLocalSettingsCreate({});
          }
        })
      );
    })
  ));

  serverSettings$ = createEffect(() => this.actions$.pipe(
    ofType(SettingsActions.actionServerSettingsRequest),
    switchMap(() => {
      return this.settings.loadServerSettings().pipe(
        map((response: ResponseObject<ServerSettings>) => {
          if (response.data) {
            return SettingsActions.actionServerSettingsDone({ serverSettings: response.data });
          } else {
            return SettingsActions.actionServerSettingsFail({});
          }
        })
      );
    })
  ));
}
