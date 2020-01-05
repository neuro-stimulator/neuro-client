import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

/**
 * Služba starající se o navigační a postraní lištu
 * Disponuje metodami pro přepínání viditelnosti postraní lišty
 * a obsahuje vlastnosti pro nastavení nadpisu a podnadpisu stránky
 */
@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private readonly _showSidebar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly _navigationChange: EventEmitter<any> = new EventEmitter<any>();

  public title: string;
  public subtitle: string;
  public icon: string;
  public working: boolean;
  public applyCustomNavColor: boolean;
  public readonly customNavColor: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public readonly navigationChange$: Observable<any> = this._navigationChange.asObservable();

  constructor(private readonly _route: ActivatedRoute,
              private readonly _router: Router) {
    this.title = '';
    this.subtitle = '';
    this.icon = '';
    this.working = false;
    this.applyCustomNavColor = false;

    /**
     * Přihlásí se k odběru událostí na změnu url
     * Pokud daná routa obsahuje v datech parametr 'title',
     * dosadí ho jako titulek
     */
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
        .subscribe((event) => {
          this.title = event['title'];
          this.applyCustomNavColor = event['applyCustomNavColor'] !== undefined ? event['applyCustomNavColor'] : false;
          this._navigationChange.next(event);
        });
  }

  /**
   * Přepne viditelnost postraní lišty
   */
  toggle() {
    this._showSidebar.next(!this._showSidebar.getValue());
  }

  /**
   * Nastaví viditelnost postraní lišty
   * @param show True, pokud se má lišta zobrazit, jinak false
   */
  set showSidebar(show: boolean) {
    this._showSidebar.next(show);
  }

  /**
   * Vrátí pozorovatelnou hodnotu pro viditelnost postraní lišty
   */
  get showSidebarValue(): Observable<boolean> {
    return this._showSidebar;
  }
}
