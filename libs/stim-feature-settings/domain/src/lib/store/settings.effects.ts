import { Injectable } from '@angular/core';

import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { ResponseObject } from '@stechy1/diplomka-share';

import { SettingsService } from '../infrastructure/settings.service';
import { ServerSettings, Settings } from '../domain/settings';
import * as SettingsActions from './settings.actions';
import { settingsFeature } from './settings.reducer';

@Injectable()
export class SettingsEffects {
  constructor(private readonly settings: SettingsService, private readonly actions$: Actions, private readonly store: Store) {}

  localSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.actionLocalSettingsRequest),
      withLatestFrom(this.store.select(settingsFeature)),
      filter(([action, settings]) => !settings.localSettingsLoaded),
      switchMap(() => {
        return of(this.settings.loadLocalSettings()).pipe(
          map((settings: Settings) => {
            if (settings) {
              return SettingsActions.actionLocalSettingsDone({ settings });
            } else {
              return SettingsActions.actionLocalSettingsCreate();
            }
          })
        );
      })
    )
  );

  invokeSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.actionLocalSettingsInvoke),
      withLatestFrom(this.store.select(settingsFeature)),
      map(([action, settings]) => SettingsActions.actionLocalSettingsDone({ settings: settings.localSettings }))
    )
  );

  saveLocalSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.actionSaveLocalSettingsRequest),
      switchMap((action) => {
        this.settings.saveLocalSettings(action.settings);
        return of(
          SettingsActions.actionSaveLocalSettingsDone({
            settings: action.settings,
          })
        );
      })
    )
  );

  serverSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.actionServerSettingsRequest),
      switchMap(() => {
        return this.settings.loadServerSettings().pipe(
          map((response: ResponseObject<ServerSettings>) => {
            if (response.data) {
              return SettingsActions.actionServerSettingsDone({
                serverSettings: response.data,
              });
            } else {
              return SettingsActions.actionServerSettingsFail({ serverSettings: null });
            }
          })
        );
      })
    )
  );

  saveServerSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.actionSaveServerSettingsRequest),
      switchMap((action) => {
        return this.settings.saveServerSettings(action.serverSettings).pipe(
          map((response: ResponseObject<ServerSettings>) => {
            // TODO error handling
            return SettingsActions.actionSaveServerSettingsDone({
              serverSettings: response.data,
            });
          })
        );
      })
    )
  );

  seedDatabase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.actionServerSeedDatabaseRequest),
      switchMap(() => {
        return this.settings.seedDatabase().pipe(
          map((response: ResponseObject<{ statistics: Record<string, string> }>) => {
            return SettingsActions.actionServerSeedDatabaseDone({
              statistics: response.data,
            });
          })
        );
      })
    )
  );

  truncateDatabase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.actionServerTruncateDatabaseRequest),
      switchMap(() => {
        return this.settings.truncateDatabase().pipe(
          map((response: ResponseObject<{ statistics: Record<string, string> }>) => {
            return SettingsActions.actionServerTruncateDatabaseDone({
              statistics: response.data,
            });
          })
        );
      })
    )
  );
}
