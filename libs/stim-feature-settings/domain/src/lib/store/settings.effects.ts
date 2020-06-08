import { Injectable } from "@angular/core";

import { map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

import { Actions, createEffect, ofType } from "@ngrx/effects";

import { SettingsService } from "../infrastructure/settings.service";
import { ServerSettings, Settings } from "../domain/settings";
import * as SettingsActions from './settings.actions';
import { ResponseObject } from "@stechy1/diplomka-share";

@Injectable()
export class SettingsEffects {
  constructor(private readonly settings: SettingsService,
              private readonly actions$: Actions) {}

  localSettings$ = createEffect(() => this.actions$.pipe(
    ofType(SettingsActions.actionLocalSettingsRequest),
    switchMap(() => {
      return of(this.settings.loadLocalSettings()).pipe(
        map((settings: Settings) => SettingsActions.actionLocalSettingsDone({ settings }))
      );
    })
  ));

  serverSettings$ = createEffect(() => this.actions$.pipe(
    ofType(SettingsActions.actionServerSettingsRequest),
    switchMap(() => {
      return this.settings.loadServerSettings().pipe(
        map((response: ResponseObject<ServerSettings>) => {
          if (!response.data) {
            return SettingsActions.actionServerSettingsFail({});
          } else {
            return SettingsActions.actionServerSettingsDone({ serverSettings: response.data });
          }
        })
      );
    })
  ));
}
