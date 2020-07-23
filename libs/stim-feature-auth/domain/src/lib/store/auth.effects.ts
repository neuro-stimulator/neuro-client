import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { ResponseObject, User } from '@stechy1/diplomka-share';

import { AuthService } from '../infrastructure/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly service: AuthService,
    private readonly router: Router
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.actionRegisterRequest),
      switchMap((action) => {
        return this.service.register(action.user);
      }),
      map((response: ResponseObject<User>) =>
        AuthActions.actionRegisterRequestDone({ user: response.data })
      ),
      catchError((errorResponse) => {
        return of(AuthActions.actionRegisterRequestFail({}));
      })
    )
  );

  registerDone$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.actionRegisterRequestDone),
        tap(() => this.router.navigate(['/', 'auth', 'login']))
      ),
    { dispatch: false }
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.actionLoginRequest),
      switchMap((action) => {
        return this.service.login(action.user);
      }),
      map((response: ResponseObject<User>) =>
        AuthActions.actionLoginRequestDone({
          user: response.data,
        })
      ),
      catchError((errorResponse) => {
        return of(AuthActions.actionLoginRequestFail({}));
      })
    )
  );

  loginDone$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.actionLoginRequestDone),
        tap((action) => {
          this.service.isLogged = true;
        }),
        tap(() => this.router.navigate(['/', 'profile']))
      ),
    { dispatch: false }
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.actionRefreshTokenRequest),
      switchMap((action) => {
        return this.service.refreshToken();
      }),
      map((response: ResponseObject<User>) =>
        AuthActions.actionRefreshTokenRequestDone({
          user: response.data,
        })
      ),
      catchError((errorResponse) => {
        return of(AuthActions.actionRefreshTokenRequestFail({}));
      })
    )
  );

  refreshDone$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.actionRefreshTokenRequestDone),
        tap((action) => {
          this.service.isLogged = true;
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.actionLogoutRequest),
      switchMap((action) => {
        return this.service.logout();
      }),
      map((response: ResponseObject<User>) =>
        AuthActions.actionLogoutRequestDone({})
      ),
      catchError((errorResponse) => {
        return of(AuthActions.actionLogoutRequestFail({}));
      })
    )
  );

  logoutDone$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthActions.actionLogoutRequestDone,
          AuthActions.actionLoginRequestFail
        ),
        tap(() => {
          this.service.isLogged = false;
        }),
        tap(() => this.router.navigate(['auth']))
      ),
    { dispatch: false }
  );
}
