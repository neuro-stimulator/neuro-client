import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';

import { AssetPlayerState } from './asset-player.type';
export const assetPlayerReducerKey = 'assetPlayer';

export function assetPlayerReducer(assetPlayerState: AssetPlayerState, sequencesAction: Action) {
  return createReducer({})(assetPlayerState, sequencesAction);
}

export const assetPlayerFeature = createFeatureSelector<AssetPlayerState>(assetPlayerReducerKey);
