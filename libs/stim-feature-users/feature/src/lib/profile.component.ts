import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import {
  AuthFacade,
  AuthState,
} from '@diplomka-frontend/stim-feature-auth/domain';
import { Router } from '@angular/router';

@Component({
  selector: 'stim-feature-users',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private _stateSubscription: Subscription;

  constructor(
    private readonly facade: AuthFacade,
    private readonly router: Router
  ) {
    this._stateSubscription = this.facade.state.subscribe(
      (state: AuthState) => {
        if (!state.isAuthenticated) {
          this.router.navigate(['auth', 'login']);
        }
      }
    );
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this._stateSubscription.unsubscribe();
  }

  handleRefreshToken() {
    this.facade.refreshToken();
  }

  get state(): Observable<AuthState> {
    return this.facade.state;
  }
}
