import { createAction, props } from '@ngrx/store';

import { ParseCommandResult } from '../domain/parse-command-result';
import { ConsoleCommand } from '../domain/console-command';

export const loadHistory = createAction(
  '[Console] load command history',
  props<{}>()
);

export const historyLoaded = createAction(
  '[Console] command history loaded',
  props<{ commands: ConsoleCommand[] }>()
);

export const clearHistory = createAction(
  '[Console] clear history',
  props<{}>()
);

export const parseCommand = createAction(
  '[Console] parse command',
  props<{ rawCommand: string }>()
);

export const saveCommand = createAction(
  '[Console] save command to local storage',
  props<{ rawCommand: string; fromUser: boolean }>()
);

export const commandValid = createAction(
  '[Console] command is valid',
  props<{ command: ParseCommandResult }>()
);

export const commandInvalid = createAction(
  '[Console] command is invalid',
  props<{ rawCommand: string; commandName: string; invalidReason: string }>()
);

export const sendCommandToServer = createAction(
  '[Console] sending command request to server',
  props<{ command: ParseCommandResult }>()
);

export const processLocalComand = createAction(
  '[Console] sending command request to process localy',
  props<{ command: ParseCommandResult }>()
);

export const noAction = createAction('[Console] no action', props<{}>());
