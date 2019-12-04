import { Injectable } from '@angular/core';
import { SerialService } from '../../share/serial.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';
import { ConsoleCommand } from './console-command';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {

  private static readonly STORAGE_KEY = 'commands';

  private readonly _commands: BehaviorSubject<ConsoleCommand[]> = new BehaviorSubject<ConsoleCommand[]>([]);
  public readonly commands$: Observable<ConsoleCommand[]> = this._commands.asObservable();

  constructor(private readonly _serial: SerialService,
              private readonly _storage: LocalStorageService) {
    this._serial.rawData$.subscribe(data => {
      this._processData({date: new Date(), text: data});
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

  clearHistory() {
    this._storage.set(ConsoleService.STORAGE_KEY, []);
    this._commands.next([]);
  }
}
