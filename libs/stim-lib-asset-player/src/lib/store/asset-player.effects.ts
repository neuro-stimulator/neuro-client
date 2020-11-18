import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { ResponseObject } from '@stechy1/diplomka-share';

import { AssetPlayerService } from '../infrastructure/asset-player.service';
import * as AssetPlayerActions from './asset-player.actions';

@Injectable()
export class AssetPlayerEffects {
  constructor(private readonly actions$: Actions, private readonly service: AssetPlayerService, private readonly store: Store, private readonly router: Router) {}

  open$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssetPlayerActions.actionAssetPlayerOpenRequest),
      mergeMap(() =>
        this.service.open().pipe(
          map(() => {
            return AssetPlayerActions.actionAssetPlayerOpenRequestDone();
          }),
          catchError(() => {
            return of(AssetPlayerActions.actionAssetPlayerOpenRequestFail());
          })
        )
      )
    )
  );

  close$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssetPlayerActions.actionAssetPlayerCloseRequest),
      mergeMap(() =>
        this.service.close().pipe(
          map(() => {
            return AssetPlayerActions.actionAssetPlayerCloseRequestDone();
          }),
          catchError(() => {
            return of(AssetPlayerActions.actionAssetPlayerCloseRequestFail());
          })
        )
      )
    )
  );

  status$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssetPlayerActions.actionAssetPlayerStatusRequest),
      mergeMap(() =>
        this.service.status().pipe(
          map((response: ResponseObject<{ connected: boolean }>) => {
            return AssetPlayerActions.actionAssetPlayerStatusRequestDone(response.data);
          }),
          catchError(() => {
            return of(AssetPlayerActions.actionAssetPlayerStatusRequestFail());
          })
        )
      )
    )
  );
}
