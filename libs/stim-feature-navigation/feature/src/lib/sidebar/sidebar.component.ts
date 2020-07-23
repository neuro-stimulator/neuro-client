import { Component, OnInit } from '@angular/core';
import { NavigationFacade } from '@diplomka-frontend/stim-feature-navigation/domain';
import {
  AuthFacade,
  AuthState,
} from '@diplomka-frontend/stim-feature-auth/domain';
import { Observable } from 'rxjs';

@Component({
  selector: 'stim-feature-navigation-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent implements OnInit {
  constructor(
    public navigation: NavigationFacade,
    private readonly facade: AuthFacade
  ) {}

  ngOnInit() {}

  handleCloseSidebar() {
    this.navigation.showSidebar = false;
  }

  get authState(): Observable<AuthState> {
    return this.facade.state;
  }
}
