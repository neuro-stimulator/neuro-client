import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";

import { Actions, ofType } from "@ngrx/effects";


import { Settings } from "../domain/settings";
import * as SettingsActions from "../store/settings.actions";
import { SettingsFacade } from "./settings.facade";
import { map, switchMap, take } from "rxjs/operators";

@Injectable()
export class LocalSettingsResolver implements Resolve<Settings> {

  constructor(private readonly actions$: Actions,
              private readonly _settings: SettingsFacade) {
  }

  resolve(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this._settings.state.pipe(
      take(1),
      map((state) => {
        return [state.localSettingsLoaded, state.localSettings]
      }),
      switchMap(([loaded, settings]) => {
        if (loaded) {
          return of(settings);
        } else {
          this._settings.loadLocalSettings();
          return this.actions$.pipe(
            // TODO catch fail
            ofType(SettingsActions.actionServerSettingsDone),
            take(1)
          );
        }
      })
    );
  }

}
