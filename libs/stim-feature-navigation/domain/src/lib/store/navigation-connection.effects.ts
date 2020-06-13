import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";

import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { AliveCheckerFacade, actionServerConnected, actionServerDisconnected, actionServerConnecting } from "@diplomka-frontend/stim-lib-connection";
import { NavigationState } from "@diplomka-frontend/stim-feature-navigation/domain";

import { NavigationService } from "../infrastructure/navigation.service";
import * as NavigationActions from './navigation.actions';

@Injectable()
export class NavigationConnectionEffects {

  constructor(private readonly navigation: NavigationService,
              private readonly connection: AliveCheckerFacade,
              private readonly store: Store<NavigationState>,
              private readonly actions$: Actions) {}

  serverConnecting$ = createEffect(() => this.actions$.pipe(
    ofType(actionServerConnecting),
    tap(() => {
      this.store.dispatch(NavigationActions.actionIconChange({ icon: 'fa-circle text-warning' }));
      this.store.dispatch(NavigationActions.actionSubtitleChange({ subtitle: 'SHARE.SERIAL.STATUS_CONNECTING' }));
    })
  ), { dispatch: false});
  serverConnected$ = createEffect(() => this.actions$.pipe(
    ofType(actionServerConnected),
    tap(() => {
      this.store.dispatch(NavigationActions.actionIconChange({ icon: 'fa-circle text-success' }));
      this.store.dispatch(NavigationActions.actionSubtitleChange({ subtitle: 'SHARE.SERIAL.STATUS_CONNECTED' }));
    })
  ), { dispatch: false });
  serverDisconnected$ = createEffect(() => this.actions$.pipe(
    ofType(actionServerDisconnected),
    tap(() => {
      this.store.dispatch(NavigationActions.actionIconChange({ icon: 'fa-circle text-danger' }));
      this.store.dispatch(NavigationActions.actionSubtitleChange({ subtitle: 'SHARE.SERIAL.STATUS_DISCONNECTED' }));
    })
  ), { dispatch: false });
}
