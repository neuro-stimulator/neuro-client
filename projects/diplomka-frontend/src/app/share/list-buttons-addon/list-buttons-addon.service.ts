import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListButtonsAddonService {

  public readonly filterRequest: EventEmitter<any> = new EventEmitter<any>();

  public readonly searchValue: EventEmitter<string> = new EventEmitter<string>();

  public readonly addonVisible: EventEmitter<boolean> = new EventEmitter<boolean>();
}
