import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { LocalStorageService } from 'angular-2-local-storage';

import { environment, makeURL } from '../../../environments/environment';
import { AliveCheckerService, ConnectionStatus } from '../../alive-checker.service';
import { ConsoleCommand } from './console-command';
import { CommandService } from './command.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {

  private static readonly STORAGE_KEY = 'commands';

  private readonly _commands: BehaviorSubject<ConsoleCommand[]> = new BehaviorSubject<ConsoleCommand[]>([]);
  public readonly commands$: Observable<ConsoleCommand[]> = this._commands.asObservable();

  private readonly _socket = new Socket({url: `${makeURL(environment.url.socket, environment.port.socket)}/commands`});

  constructor(private readonly aliveChecker: AliveCheckerService,
              private readonly _command: CommandService,
              private readonly _translator: TranslateService,
              private readonly _storage: LocalStorageService) {

    aliveChecker.connectionStatus.subscribe((status: ConnectionStatus) => {
      if (status === ConnectionStatus.CONNECTED) {
        this._socket.connect();
      }
    });
    aliveChecker.disconnect.subscribe(() => {
      if (this._socket !== undefined) {
        this._socket.disconnect();
      }
    });

    this._loadHistory();
  }

  private _loadHistory() {
    const commands = this._storage.get<ConsoleCommand[]>(ConsoleService.STORAGE_KEY) || [];
    this._commands.next(commands);
  }

  private _processData(data: ConsoleCommand) {
    const commands = this._commands.getValue();
    commands.push(data);
    this._storage.set(ConsoleService.STORAGE_KEY, commands);
    this._commands.next(commands);
  }

  public clearHistory() {
    this._storage.set(ConsoleService.STORAGE_KEY, []);
    this._commands.next([]);
  }

  public processCommand(text: string) {
    this._processData({date: new Date(), text});
    if (text === 'help') {
      this.saveCommandRaw(this._command.buildHelp());
      return;
    }
    const [valid, name, data] = this._command.parseCommand(text);
    if (!valid) {
      this.saveCommandRaw(data);
    } else {
      this._socket.emit('command', {name, data});
    }
  }

  public saveCommandRaw(text: string, date?: Date) {
    this._translator.get(text)
        .toPromise()
        .then(value => {
          this._processData({date: date ? date : new Date(), text: value});
        });
  }

  public saveCommand(data: ConsoleCommand) {
    this._processData(data);
  }
}
