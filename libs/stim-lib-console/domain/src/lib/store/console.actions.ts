import { createAction, props } from '@ngrx/store';
import { ParseCommandResult } from '../domain/parse-command-result';

export const parseCommand = createAction(
  '[Console] parse command',
  props<{ rawCommand: string }>()
);

export const saveCommand = createAction(
  '[Console] save command to local storage',
  props<{ rawCommand: string }>()
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
