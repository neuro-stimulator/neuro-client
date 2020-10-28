import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import { LocalCommandFactory } from '../local-command-handlers/local-command.factory';
import { ConsoleService } from '../infrastructure/console.service';
import { CommandParserService } from '../infrastructure/command-parser.service';
import { ParseCommandResult } from '../domain/parse-command-result';
import { ConsoleCommand } from '../domain/console-command';
import * as ConsoleActions from './console.actions';
import { consoleFeature } from './console.reducer';

@Injectable()
export class ConsoleEffects {
  loadCommands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConsoleActions.loadHistory),
      switchMap(() => {
        return of(this._service.loadHistory());
      }),
      map((commands: ConsoleCommand[]) => ConsoleActions.historyLoaded({ commands }))
    )
  );
  clearHistory$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ConsoleActions.clearHistory),
        tap(() => {
          this._service.clearHistory();
        })
      ),
    { dispatch: false }
  );
  parseCommand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConsoleActions.parseCommand),
      switchMap((action) => {
        return of<ParseCommandResult>(this._parser.parseCommand(action.rawCommand)).pipe(
          map((result: ParseCommandResult) => {
            const actions = [];
            actions.push(
              ConsoleActions.saveCommand({
                rawCommand: action.rawCommand,
                fromUser: true,
              })
            );
            if (result.valid) {
              switch (result.consumer) {
                case 'client':
                  actions.push(ConsoleActions.processLocalComand({ command: result }));
                  break;
                case 'server':
                  actions.push(ConsoleActions.sendCommandToServer({ command: result }));
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
          }),
          switchMap((a) => a)
        );
      })
    )
  );
  saveInvalidCommand = createEffect(() =>
    this.actions$.pipe(
      ofType(ConsoleActions.commandInvalid),
      map((action) =>
        ConsoleActions.saveCommand({
          rawCommand: action.invalidReason,
          fromUser: false,
        })
      )
    )
  );
  saveCommand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConsoleActions.saveCommand),
      withLatestFrom(this.store.select(consoleFeature)),
      map(([action, state]) => {
        const command = this._service.saveCommand(action.rawCommand, action.fromUser);
        const commands = [...state.commandHistory];
        commands.push(command);

        return ConsoleActions.historyLoaded({ commands });
      })
    )
  );
  sendCommandToServer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConsoleActions.sendCommandToServer),
      switchMap((action) => {
        return this._service.sendCommand(action.command);
      }),
      map(() => {
        return ConsoleActions.noAction();
      })
    )
  );
  processLocalCommand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConsoleActions.processLocalComand),
      switchMap((action) => {
        const handler = this._factory.getCommandHandler(action.command);
        return handler.handle(action.command);
      }),
      map((result) => {
        if (result) {
          return ConsoleActions.saveCommand({
            rawCommand: result,
            fromUser: false,
          });
        } else {
          return ConsoleActions.noAction();
        }
      })
    )
  );

  constructor(
    private readonly _service: ConsoleService,
    private readonly _parser: CommandParserService,
    private readonly _factory: LocalCommandFactory,
    private readonly actions$: Actions,
    private readonly store: Store
  ) {}
}
