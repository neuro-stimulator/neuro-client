import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListButtonsAddonService {
  public readonly selectionMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public readonly filterRequest: EventEmitter<any> = new EventEmitter<any>();

  public readonly searchValue: EventEmitter<string> = new EventEmitter<string>();

  public readonly addonVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public readonly selectAllRequest: EventEmitter<any> = new EventEmitter<any>();

  public readonly selectNoneRequest: EventEmitter<any> = new EventEmitter<any>();

  public readonly exportRequest: EventEmitter<any> = new EventEmitter<any>();

  public readonly deleteSelectedRequest: EventEmitter<any> = new EventEmitter<any>();
}
