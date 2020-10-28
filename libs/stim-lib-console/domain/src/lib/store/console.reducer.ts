import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';

import { ConsoleState } from './console.state';
import * as ConsoleActions from './console.actions';

export const consoleReducerKey = 'console';

export function consoleReducer(consoleState: ConsoleState, consoleAction: Action) {
  return createReducer(
    {
      commandHistory: [],
    },
    on(ConsoleActions.historyLoaded, (state, action) => ({
      ...state,
      commandHistory: [...action.commands],
    })),
    on(ConsoleActions.clearHistory, (state) => ({
      ...state,
      commandHistory: [],
    }))
  )(consoleState, consoleAction);
}

export const consoleFeature = createFeatureSelector<ConsoleState>(consoleReducerKey);
