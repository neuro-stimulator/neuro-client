import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { NavigationFacade } from '@neuro-client/stim-feature-navigation/domain';
import { AuthFacade, AuthState } from '@neuro-client/stim-feature-auth/domain';

@Component({
  selector: 'stim-feature-navigation-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent {
  constructor(public navigation: NavigationFacade, private readonly facade: AuthFacade) {}

  handleCloseSidebar() {
    this.navigation.showSidebar = false;
  }

  get authState(): Observable<AuthState> {
    return this.facade.state;
  }
}
