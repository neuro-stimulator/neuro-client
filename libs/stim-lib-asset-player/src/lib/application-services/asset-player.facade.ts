import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as fromConnection from '@diplomka-frontend/stim-lib-connection';

import * as AssetPlayerActions from '../store/asset-player.actions';
import * as fromAssetPlayer from '../store/asset-player.reducer';
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

  public spawn() {
    this.store.dispatch(AssetPlayerActions.actionAssetPlayerSpawnRequest());
  }

  public kill() {
    this.store.dispatch(AssetPlayerActions.actionAssetPlayerKillRequest());
  }

  get state(): Observable<AssetPlayerState> {
    return this.store.select(fromAssetPlayer.assetPlayerFeature);
  }

  get ipcClosed(): Observable<boolean> {
    return this.store.select(fromConnection.ipcClosedSelector);
  }

  get connected(): Observable<boolean> {
    return this.store.select(fromConnection.ipcConnectedSelector);
  }

  get disconnected(): Observable<boolean> {
    return this.store.select(fromConnection.ipcDisconnectedSelector);
  }
}
