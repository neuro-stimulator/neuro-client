import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private _showSidebar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  toggle() {
    this._showSidebar.next(!this._showSidebar.getValue());
  }

  set showSidebar(show: boolean) {
    this._showSidebar.next(show);
  }

  get showSidebarValue(): Observable<boolean> {
    return this._showSidebar;
  }
}
