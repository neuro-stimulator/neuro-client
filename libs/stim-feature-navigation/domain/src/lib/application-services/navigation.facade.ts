import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { NavigationState } from '../store/navigation.state';
import * as NavigationActions from '../store/navigation.actions';
import * as fromNavigation from '../store/navigation.reducer';

@Injectable()
export class NavigationFacade {
  constructor(private readonly store: Store<NavigationState>) {}

  set titleArgs(titleArgs: {}) {
    this.store.dispatch(NavigationActions.actionTitleArgsChange({ titleArgs }));
  }
  set subtitle(subtitle: string) {
    this.store.dispatch(NavigationActions.actionSubtitleChange({ subtitle }));
  }
  set subtitleArgs(subtitleArgs: {}) {
    this.store.dispatch(
      NavigationActions.actionSubtitleArgsChange({ subtitleArgs })
    );
  }
  set icon(icon: string) {
    this.store.dispatch(NavigationActions.actionIconChange({ icon }));
  }
  set customNavColor(customNavColor: string) {
    this.store.dispatch(
      NavigationActions.actionCustomNavColorChange({ customNavColor })
    );
  }
  set showAddon(show: boolean) {
    this.store.dispatch(
      NavigationActions.actionSetShowAddon({ showAddon: show })
    );
  }

  /**
   * Přepne viditelnost postraní lišty
   */
  toggleSidebarVisibility() {
    this.store.dispatch(NavigationActions.actionToggleSidebar({}));
  }

  /**
   * Nastaví viditelnost postraní lišty
   *
   * @param show True, pokud se má lišta zobrazit, jinak false
   */
  set showSidebar(show: boolean) {
    this.store.dispatch(
      NavigationActions.actionSetShowSidebar({ showSidebar: show })
    );
  }

  get navigationState(): Observable<NavigationState> {
    return this.store.select(fromNavigation.navigationFeature);
  }
}
