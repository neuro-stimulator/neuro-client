import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  public title: string;

  constructor(private readonly _route: ActivatedRoute,
              private readonly _router: Router) {

    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this._route),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data))
        .subscribe((event) => this.title = event['title']);
  }

  private _showSidebar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  set showSidebar(show: boolean) {
    this._showSidebar.next(show);
  }

  get showSidebarValue(): Observable<boolean> {
    return this._showSidebar;
  }

  toggle() {
    this._showSidebar.next(!this._showSidebar.getValue());
  }
}
