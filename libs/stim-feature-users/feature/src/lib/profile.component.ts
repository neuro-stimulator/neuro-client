import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthFacade, AuthState } from '@diplomka-frontend/stim-feature-auth/domain';

@Component({
  selector: 'stim-feature-users',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnDestroy {
  private _stateSubscription: Subscription;

  constructor(private readonly facade: AuthFacade, private readonly router: Router) {
    this._stateSubscription = this.facade.state.subscribe((state: AuthState) => {
      if (!state.isAuthenticated) {
        this.router.navigate(['auth', 'login']);
      }
    });
  }

  ngOnDestroy() {
    this._stateSubscription.unsubscribe();
  }

  handleRefreshToken() {
    this.facade.refreshToken();
  }

  get state(): Observable<AuthState> {
    return this.facade.state;
  }

  handleLogout() {
    this.facade.logout();
  }
}
