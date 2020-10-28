import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, tap } from 'rxjs/operators';

import { ResponseObject, User } from '@stechy1/diplomka-share';

import { AuthService } from '../infrastructure/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private readonly actions$: Actions, private readonly service: AuthService, private readonly router: Router) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.actionRegisterRequest),
      concatMap((action) => {
        return this.service.register(action.user).pipe(
          map((response: ResponseObject<User>) => AuthActions.actionRegisterRequestDone({ user: response.data })),
          catchError(() => {
            return of(AuthActions.actionRegisterRequestFail());
          })
        );
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
      concatMap((action) => {
        return this.service.login(action.user).pipe(
          map((response: ResponseObject<User>) =>
            AuthActions.actionLoginRequestDone({
              user: response.data,
            })
          ),
          catchError(() => {
            return of(AuthActions.actionLoginRequestFail());
          })
        );
      })
    )
  );

  loginDone$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.actionLoginRequestDone),
        tap(() => {
          this.service.isLogged = true;
        }),
        tap(() => this.router.navigate(['/', 'profile']))
      ),
    { dispatch: false }
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.actionRefreshTokenRequest),
      mergeMap(() => {
        return this.service.refreshToken().pipe(
          map((response: ResponseObject<User>) =>
            AuthActions.actionRefreshTokenRequestDone({
              user: response.data,
            })
          ),
          catchError(() => {
            return of(AuthActions.actionRefreshTokenRequestFail());
          })
        );
      })
    )
  );

  refreshDone$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.actionRefreshTokenRequestDone),
        tap(() => {
          this.service.isLogged = true;
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.actionLogoutRequest),
      concatMap(() => {
        return this.service.logout().pipe(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          map((response: ResponseObject<User>) => AuthActions.actionLogoutRequestDone()),
          catchError(() => {
            return of(AuthActions.actionLogoutRequestFail());
          })
        );
      })
    )
  );

  logoutDone$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.actionLogoutRequestDone, AuthActions.actionLoginRequestFail),
        tap(() => {
          this.service.isLogged = false;
        }),
        tap(() => this.router.navigate(['auth']))
      ),
    { dispatch: false }
  );
}
