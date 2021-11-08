import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AliveCheckerFacade, actionServerConnected, actionServerDisconnected, actionServerConnecting } from '@neuro-client/stim-lib-connection';

import { NavigationService } from '../infrastructure/navigation.service';
import * as NavigationActions from './navigation.actions';

@Injectable()
export class NavigationConnectionEffects {
  constructor(private readonly navigation: NavigationService, private readonly connection: AliveCheckerFacade, private readonly store: Store, private readonly actions$: Actions) {}

  serverConnecting$ = createEffect(() =>
    { return this.actions$.pipe(
      ofType(actionServerConnecting),
      map(() => [NavigationActions.actionIconChange({ icon: 'fa-circle text-warning' }), NavigationActions.actionSubtitleChange({ subtitle: 'SHARE.SERIAL.STATUS_CONNECTING' })]),
      mergeMap((a) => a)
    ) }
  );
  serverConnected$ = createEffect(() =>
    { return this.actions$.pipe(
      ofType(actionServerConnected),
      map(() => [NavigationActions.actionIconChange({ icon: 'fa-circle text-success' }), NavigationActions.actionSubtitleChange({ subtitle: 'SHARE.SERIAL.STATUS_CONNECTED' })]),
      mergeMap((a) => a)
    ) }
  );
  serverDisconnected$ = createEffect(() =>
    { return this.actions$.pipe(
      ofType(actionServerDisconnected),
      map(() => [NavigationActions.actionIconChange({ icon: 'fa-circle text-danger' }), NavigationActions.actionSubtitleChange({ subtitle: 'SHARE.SERIAL.STATUS_DISCONNECTED' })]),
      mergeMap((a) => a)
    ) }
  );
}
