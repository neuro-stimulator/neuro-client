import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpRequest, HttpResponse} from '@angular/common/http';

import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';

import { ResponseObject, User } from '@stechy1/diplomka-share';

import { serializeRequest } from '@neuro-client/stim-lib-common';

import { AuthService } from '../infrastructure/auth.service';
import { DelayRequestStorage } from '../infrastructure/delay-request-storage.service';
import * as AuthActions from './auth.actions';
import * as fromAuth from './auth.reducer';

@Injectable()
export class AuthEffects {
  constructor(private readonly actions$: Actions,
              private readonly service: AuthService,
              private readonly delayRequestStorage: DelayRequestStorage,
              private readonly store: Store,
              private readonly router: Router) {
  }

  register$ = createEffect(() =>
    { return this.actions$.pipe(
      ofType(AuthActions.actionRegisterRequest),
      concatMap((action) => {
        return this.service.register(action.user).pipe(
          map((response: ResponseObject<User>) => AuthActions.actionRegisterRequestDone({ user: response.data })),
          catchError(() => {
            return of(AuthActions.actionRegisterRequestFail());
          })
        );
      })
    ) }
  );

  registerDone$ = createEffect(
    () =>
      { return this.actions$.pipe(
        ofType(AuthActions.actionRegisterRequestDone),
        tap(() => this.router.navigate(['/', 'auth', 'login']))
      ) },
    { dispatch: false }
  );

  login$ = createEffect(() =>
    { return this.actions$.pipe(
      ofType(AuthActions.actionLoginRequest),
      concatMap((action) => {
        return this.service.login(action.user).pipe(
          map((response: ResponseObject<User>) =>
            AuthActions.actionLoginRequestDone({
              user: response.data
            })
          ),
          catchError(() => {
            return of(AuthActions.actionLoginRequestFail());
          })
        );
      })
    ) }
  );

  loginDone$ = createEffect(
    () =>
      { return this.actions$.pipe(
        ofType(AuthActions.actionLoginRequestDone),
        tap(() => {
          this.service.isLogged = true;
        }),
        tap(() => this.router.navigate(['/', 'profile']))
      ) },
    { dispatch: false }
  );

  refreshToken$ = createEffect(() =>
    { return this.actions$.pipe(
      ofType(AuthActions.actionRefreshTokenRequest),
      mergeMap(() => {
        return this.service.refreshToken().pipe(
          map((response: ResponseObject<User>) =>
            AuthActions.actionRefreshTokenRequestDone({
              user: response.data
            })
          ),
          catchError(() => {
            return of(AuthActions.actionRefreshTokenRequestFail());
          })
        );
      })
    ) }
  );

  refreshDone$ = createEffect(
    () =>
      { return this.actions$.pipe(
        ofType(AuthActions.actionRefreshTokenRequestDone),
        withLatestFrom(this.store.select(fromAuth.authFeature)),
        map(([user, auth]) => {
          this.service.isLogged = true;
          if (auth.serializedRequest) {
            return AuthActions.actionCallRequest({ req: auth.serializedRequest });
          }

          return AuthActions.actionNoAction();
        })
      ) }
  );

  refreshFail$ = createEffect(() =>
    { return this.actions$.pipe(
      ofType(AuthActions.actionRefreshTokenRequestFail),
      tap(() => {
        this.service.isLogged = false;
      })
    ) }, { dispatch: false }
  );

  logout$ = createEffect(() =>
    { return this.actions$.pipe(
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
    ) }
  );

  logoutDone$ = createEffect(
    () => { return this.actions$.pipe(
      ofType(AuthActions.actionLogoutRequestDone, AuthActions.actionLoginRequestFail, AuthActions.actionLogoutRequestFail),
      tap(() => {
        this.service.isLogged = false;
      }),
      tap(() => this.router.navigate(['auth']))
    ) },
    { dispatch: false }
  );

  actionSaveRequest$ = createEffect(
    () => { return this.actions$.pipe(
      ofType(AuthActions.actionSaveRequest),
      map((data: { req: HttpRequest<unknown> }) => {
        return AuthActions.actionSaveRequestDone({ req: serializeRequest(data.req) });
      })
    ) });

  actionCallRequest$ = createEffect(() => { return this.actions$.pipe(
    ofType(AuthActions.actionCallRequest),
    concatMap((data: { req: string }) => {
      return this.delayRequestStorage.callRequest(data.req).pipe(
        map((res: HttpResponse<unknown>) => {
          if (res.status) {
            this.delayRequestStorage.notifyDelayResponse(res);
            return AuthActions.actionCallRequestDone();
          } else {
            return AuthActions.actionNoAction();
          }
        })
      );
    })
    ) }
  );
}
