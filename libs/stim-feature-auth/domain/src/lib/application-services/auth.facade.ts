import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '@stechy1/diplomka-share';

import { AuthState } from '../store/auth.state';
import * as AuthActions from '../store/auth.actions';
import * as fromReducer from '../store/auth.reducer';
import { DelayResponse } from '../domain/delay-response';
import { DelayRequestStorage } from '../infrastructure/delay-request-storage.service';

@Injectable()
export class AuthFacade {
  constructor(private readonly store: Store, private readonly delayRequestStorage: DelayRequestStorage) {}

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

  public saveRequest(req: HttpRequest<unknown>): Observable<HttpResponse<unknown>> {
    const delayResponse = new DelayResponse();
    this.delayRequestStorage.pushDelayResponse(delayResponse);
    this.store.dispatch(AuthActions.actionSaveRequest({ req }));
    return delayResponse.response;
  }

  public get state(): Observable<AuthState> {
    return this.store.select(fromReducer.authFeature);
  }
}
