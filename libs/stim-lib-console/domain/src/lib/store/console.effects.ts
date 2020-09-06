import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as ConsoleActions from './console.actions';
import { ConsoleService } from '../infrastructure/console.service';

import { CommandParserService } from '../infrastructure/command-parser.service';
import { ParseCommandResult } from '../domain/parse-command-result';

@Injectable()
export class ConsoleEffects {
  constructor(
    private readonly _service: ConsoleService,
    private readonly _parser: CommandParserService,
    private readonly actions$: Actions
  ) {}

  parseCommand$ = this.actions$.pipe(
    ofType(ConsoleActions.parseCommand),
    switchMap((action) => {
      return of<ParseCommandResult>(
        this._parser.parseCommand(action.rawCommand)
      ).pipe(
        map((result: ParseCommandResult) => {
          const actions = [];
          actions.push(
            ConsoleActions.saveCommand({ rawCommand: action.rawCommand })
          );
          if (result.valid) {
            switch (result.consumer) {
              case 'client':
                actions.push(
                  ConsoleActions.sendCommandToServer({ command: result })
                );
                break;
              case 'server':
                actions.push(
                  ConsoleActions.sendCommandToServer({ command: result })
                );
                break;
            }
          } else {
            actions.push(
              ConsoleActions.commandInvalid({
                rawCommand: action.rawCommand,
                commandName: result.commandName,
                invalidReason: result.invalidReason,
              })
            );
          }
          return actions;
        })
      );
    })
  );

  sendCommandToServer$ = this.actions$.pipe(
    ofType(ConsoleActions.sendCommandToServer),
    switchMap((action) => {
      return this._service.sendCommand(action.command);
    })
  );
}
