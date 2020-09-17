import { Action, createReducer, on } from '@ngrx/store';

import { IOEvent } from '@stechy1/diplomka-share';

import { PlayerState } from './player.state';
import * as PlayerActions from './player.actions';

export const playerReducerKey = 'player';

export function playerReducer(playerState: PlayerState, playerAction: Action) {
  return createReducer(
    {
      initialized: false,
      ioData: [],
      isBreakTime: false,
      repeat: 0,
      betweenExperimentInterval: 0,
      autoplay: false,
      stopConditionType: null,
      stopConditions: {},
    },
    on(PlayerActions.actionPlayerUpdateState, (state: PlayerState, action) => ({
      ...state,
      initialized: action.initialized,
      ioData: action.ioData || [],
      isBreakTime: action.isBreakTime,
      repeat: action.repeat,
      betweenExperimentInterval: action.betweenExperimentInterval,
      autoplay: action.autoplay,
      stopConditionType: action.stopConditionType,
      stopConditions: action.stopConditions,
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
        initialized: true,
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
