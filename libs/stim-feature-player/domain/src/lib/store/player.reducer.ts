import { Action, createReducer, on } from '@ngrx/store';

import { PlayerState } from './player.state';
import * as PlayerActions from './player.actions';

export const playerReducerKey = 'player';

export function playerReducer(playerState: PlayerState, playerAction: Action) {
  return createReducer(
    {
      ioData: [],
    },
    on(PlayerActions.actionPlayerIOEvent, (state: PlayerState, action) => ({
      ...state,
      ioData: [...state.ioData, action.ioEvent],
    }))
  )(playerState, playerAction);
}
