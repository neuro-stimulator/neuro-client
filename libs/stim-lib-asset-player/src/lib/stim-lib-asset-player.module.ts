import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AssetPlayerFacade } from './application-services/asset-player.facade';
import { AssetPlayerEffects } from './store/asset-player.effects';

import * as fromAssetPlayer from './store/asset-player.reducer';

@NgModule({
  imports: [StoreModule.forFeature(fromAssetPlayer.assetPlayerReducerKey, fromAssetPlayer.assetPlayerReducer), EffectsModule.forFeature([AssetPlayerEffects])],
  providers: [AssetPlayerFacade],
})
export class StimLibAssetPlayerModule {}
