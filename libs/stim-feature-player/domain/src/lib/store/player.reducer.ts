import { Action, createReducer, on } from '@ngrx/store';

import { PlayerState } from './player.state';
import * as PlayerActions from './player.actions';
import { IOEvent } from '@stechy1/diplomka-share';

export const playerReducerKey = 'player';

export function playerReducer(playerState: PlayerState, playerAction: Action) {
  return createReducer(
    {
      ioData: [],
      experimentRound: 0,
      playerInitialized: false,
    },
    on(PlayerActions.actionPlayerUpdateState, (state: PlayerState, action) => ({
      ...state,
      playerInitialized: action.initialized,
      experimentRound: action.experimentRound,
      ioData: action.ioData,
    })),
    on(
      PlayerActions.actionPrepareExperimentPlayerRequestDone,
      (state: PlayerState, action) => ({
        ...state,
        playerInitialized: true,
      })
    ),
    on(
      PlayerActions.actionPrepareExperimentPlayerRequestFail,
      (state: PlayerState, action) => ({
        ...state,
        playerInitialized: false,
      })
    ),
    on(PlayerActions.actionPlayerIOEvent, (state: PlayerState, action) => {
      const allData: IOEvent[][] = [];
      for (const roundData of state.ioData) {
        allData.push([...roundData]);
      }
      allData[state.experimentRound].push(action.ioEvent);

      return {
        ...state,
        ioData: allData,
      };
    })
  )(playerState, playerAction);
}
