import { Action, createReducer, on } from '@ngrx/store';

import { IOEvent } from '@stechy1/diplomka-share';

import { PlayerState } from './player.state';
import * as PlayerActions from './player.actions';

export const playerReducerKey = 'player';

export function playerReducer(playerState: PlayerState, playerAction: Action) {
  return createReducer(
    {
      ioData: [],
      playerInitialized: false,
      autoplay: false,
      betweenExperimentInterval: 0,
      repeat: 1,
      isBreakTime: false,
      stopConditionType: null, // TODO use stopConditionType
    },
    on(PlayerActions.actionPlayerUpdateState, (state: PlayerState, action) => ({
      ...state,
      playerInitialized: action.initialized,
      experimentRound: action.experimentRound,
      ioData: action.ioData,
      autoplay: action.autoplay,
      betweenExperimentInterval: action.betweenExperimentInterval,
      repeat: action.repeat,
      isBreakTime: action.isBreakTime,
    })),
    on(PlayerActions.actionPlayerCreateNewExperimentRound, (state) => {
      const allData: IOEvent[][] = [];
      for (const roundData of state.ioData) {
        allData.push([...roundData]);
      }
      allData.push([]);
      return {
        ...state,
        ioData: allData,
      };
    }),
    on(
      PlayerActions.actionPrepareExperimentPlayerRequestDone,
      (state: PlayerState, action) => ({
        ...state,
        playerInitialized: true,
        ioData: [],
        autoplay: action.autoplay,
        betweenExperimentInterval: action.betweenExperimentInterval,
        repeat: action.repeat,
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
      allData[allData.length - 1].push(action.ioEvent);

      return {
        ...state,
        ioData: allData,
      };
    })
  )(playerState, playerAction);
}
