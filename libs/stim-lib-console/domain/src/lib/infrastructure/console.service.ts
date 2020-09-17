import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { ResponseObject } from '@stechy1/diplomka-share';

import { TOKEN_CONSOLE_API_URL } from '@diplomka-frontend/stim-lib-common';

import { ParseCommandResult } from '../domain/parse-command-result';
import { ConsoleCommand } from '../domain/console-command';

@Injectable({
  providedIn: 'root',
})
export class ConsoleService {
  private static readonly STORAGE_KEY = 'commands';

  private readonly _commands: ConsoleCommand[] = [];

  constructor(
    @Inject(TOKEN_CONSOLE_API_URL) private readonly accessPoint: string,
    private readonly _translator: TranslateService,
    private readonly _storage: LocalStorageService,
    private readonly _http: HttpClient
  ) {
    this._loadHistory();
  }

  private _loadHistory() {
    const commands =
      this._storage.get<ConsoleCommand[]>(ConsoleService.STORAGE_KEY) || [];
    this._commands.push(...commands);
  }

  private _saveCommands() {
    this._storage.set(ConsoleService.STORAGE_KEY, [...this._commands]);
  }

  // private _processIncommingCommandResponse(data: ServerCommandResponse) {
  //   if (data.valid) {
  //     return;
  //   }
  //
  //   if (data.message) {
  //     this.saveCommandRaw(data.message);
  //     return;
  //   }
  //
  //   if (data.code) {
  //     // this._translator.get(`${SERVER_MESSAGE_CODE_PREFIX}${MESSAGE_CODE_TRANSLATOR[data.code]}`, data.params)
  //     //     .toPromise()
  //     //     .then((value: string) => {
  //     //       this.saveCommandRaw(value);
  //     //     });
  //   }
  // }

  // private _processData(data: ConsoleCommand) {
  //   const commands = this._commands.getValue();
  //   commands.push(data);
  //   this._storage.set(ConsoleService.STORAGE_KEY, commands);
  //   this._commands.next(commands);
  // }
  //
  // public clearHistory() {
  //   this._storage.set(ConsoleService.STORAGE_KEY, []);
  //   this._commands.next([]);
  // }
  //
  // public processCommand(text: string) {
  //   this._processData({date: new Date(), text});
  //   if (text === 'help') {
  //     this.saveCommandRaw(commandParser.buildHelp());
  //     return;
  //   }
  //   const [valid, name, data] = commandParser.parseCommand(text);
  //   if (!valid) {
  //     this.saveCommandRaw(data);
  //   } else {
  //     this._socket.emit('command', {name, data});
  //   }
  // }
  //
  // public saveCommandRaw(text: string, date?: Date) {
  //   this._translator.get(text)
  //       .toPromise()
  //       .then((value: string) => {
  //         this._processData({date: date ? date : new Date(), text: value});
  //       });
  // }
  //
  // public saveCommand(data: ConsoleCommand) {
  //   this._processData(data);
  // }
  sendCommand(command: ParseCommandResult): Observable<ResponseObject<any>> {
    return this._http.post(
      `${this.accessPoint}/${command.commandName}`,
      command.parameters
    );
  }

  public loadHistory(): ConsoleCommand[] {
    return [...this._commands];
  }

  saveCommand(rawCommand: string, fromUser: boolean): ConsoleCommand {
    const data: ConsoleCommand = {
      date: new Date(),
      text: rawCommand,
      fromUser,
    };

    this._commands.push(data);
    this._saveCommands();

    return data;
  }

  public clearHistory() {
    this._commands.splice(0);
    this._saveCommands();
  }
}
