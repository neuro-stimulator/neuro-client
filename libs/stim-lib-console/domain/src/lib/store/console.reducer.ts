import { Action, createReducer } from '@ngrx/store';
import { ConsoleState } from './console.state';

export const consoleReducerKey = 'console';

export function consoleReducer(
  consoleState: ConsoleState | undefined,
  consoleAction: Action
) {
  return createReducer({});
}
