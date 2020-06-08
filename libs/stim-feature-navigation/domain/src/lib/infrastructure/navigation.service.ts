import { Injectable} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

import { Store } from "@ngrx/store";

import { NavigationState } from "../store/navigation.state";
import * as NavigationActions from '../store/navigation.actions';

/**
 * Služba starající se o navigační a postraní lištu
 * Disponuje metodami pro přepínání viditelnosti postraní lišty
 * a obsahuje vlastnosti pro nastavení nadpisu a podnadpisu stránky
 */
@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  // private readonly _showSidebar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // private readonly _navigationChange: EventEmitter<any> = new EventEmitter<any>();
  // private readonly _hasPageTools: EventEmitter<boolean> = new EventEmitter<boolean>();
  //
  // public title: string;
  // public titleArgs: {};
  // public subtitle: string;
  // public subtitleArgs: {};
  // public icon: string;
  // public working: boolean;
  // public applyCustomNavColor: boolean;
  // public showPageTools: boolean;
  // public pageToolsComponent: Type<any>;
  // public readonly customNavColor: BehaviorSubject<string> = new BehaviorSubject<string>('');
  // public readonly navigationChange$: Observable<any> = this._navigationChange.asObservable();
  // public readonly hasPageTools$: Observable<boolean> = this._hasPageTools.asObservable();

  constructor(private readonly _route: ActivatedRoute,
              private readonly _router: Router,
              private readonly store: Store<NavigationState>) {
    // this.title = '';
    // this.subtitle = '';
    // this.titleArgs = {};
    // this.subtitleArgs = {};
    // this.showPageTools = false;
    // this.icon = '';
    // this.working = false;
    // this.applyCustomNavColor = false;

    /**
     * Přihlásí se k odběru událostí na změnu url
     * Pokud daná routa obsahuje v datech parametr 'title',
     * dosadí ho jako titulek
     */
    this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this._route),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data))
        .subscribe((event) => {
          const title = event['title'];
          const applyCustomNavColor = event['applyCustomNavColor'] !== undefined ? event['applyCustomNavColor'] : false;
          const pageToolsComponent = event['pageToolsComponent'];
          const hasPageTools = pageToolsComponent !== undefined;
          // const navigationChange = event;
          this.store.dispatch(NavigationActions.actionNavigationChange({ title, applyCustomNavColor, hasPageTools, pageToolsComponent }));
        });
  }

  /**
   * Vrátí pozorovatelnou hodnotu pro viditelnost postraní lišty
   */
  // get showSidebarValue(): Observable<boolean> {
    // return this._showSidebar;
  // }
}
