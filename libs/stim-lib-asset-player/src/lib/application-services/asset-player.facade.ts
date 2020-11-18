import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AssetPlayerActions from '../store/asset-player.actions';
import * as fromAssetPlayer from '../store/asset-player.reducer';
import { Observable } from 'rxjs';
import { AssetPlayerState } from '../store/asset-player.type';

@Injectable()
export class AssetPlayerFacade {
  constructor(private readonly store: Store) {}

  public open() {
    this.store.dispatch(AssetPlayerActions.actionAssetPlayerOpenRequest());
  }

  public close() {
    this.store.dispatch(AssetPlayerActions.actionAssetPlayerCloseRequest());
  }

  public status() {
    this.store.dispatch(AssetPlayerActions.actionAssetPlayerStatusRequest());
  }

  get state(): Observable<AssetPlayerState> {
    return this.store.select(fromAssetPlayer.assetPlayerFeature);
  }
}
