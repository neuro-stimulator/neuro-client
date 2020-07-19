import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import {
  AuthFacade,
  AuthState,
} from '@diplomka-frontend/stim-feature-auth/domain';
import { Router } from '@angular/router';

@Component({
  selector: 'stim-feature-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
})
export class AuthComponent implements OnInit, OnDestroy {
  private _stateSubscription: Subscription;

  constructor(
    private readonly facade: AuthFacade,
    private readonly router: Router
  ) {
    this._stateSubscription = this.facade.state.subscribe(
      (state: AuthState) => {
        if (!state.isAuthenticated) {
          this.router.navigate(['auth', 'login']);
        } else {
          this.router.navigate(['profile']);
        }
      }
    );
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this._stateSubscription.unsubscribe();
  }
}
