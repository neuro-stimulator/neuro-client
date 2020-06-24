import { Action, createReducer } from '@ngrx/store';
import { PlayerState } from './player.state';

export const playerReducerKey = 'player';

export function playerReducer(playerState: PlayerState, playerAction: Action) {
  return createReducer({
    experiment: null,
  });
}
