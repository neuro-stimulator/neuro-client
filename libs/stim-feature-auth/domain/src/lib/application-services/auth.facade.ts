import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '@stechy1/diplomka-share';

import { AuthState } from '../store/auth.state';
import * as AuthActions from '../store/auth.actions';
import * as fromReducer from '../store/auth.reducer';

@Injectable()
export class AuthFacade {
  constructor(private readonly store: Store<AuthState>) {}

  public register(user: User) {
    this.store.dispatch(AuthActions.actionRegisterRequest({ user }));
  }

  public login(user: User) {
    this.store.dispatch(AuthActions.actionLoginRequest({ user }));
  }

  public refreshToken() {
    this.store.dispatch(AuthActions.actionRefreshTokenRequest());
  }

  public logout() {
    this.store.dispatch(AuthActions.actionLogoutRequest());
  }

  public get state(): Observable<AuthState> {
    return this.store.select(fromReducer.authFeature);
  }
}
