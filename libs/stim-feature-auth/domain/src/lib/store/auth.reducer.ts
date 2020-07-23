import { Action, createReducer, on } from '@ngrx/store';

import { createEmptyUser, User } from '@stechy1/diplomka-share';

import { AuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducerKey = 'auth';

const emptyUser: User = createEmptyUser();

export function authReducer(authState: AuthState, authAction: Action) {
  return createReducer(
    {
      isAuthenticated: undefined,
      user: emptyUser,
    },
    on(
      AuthActions.actionLoginRequestDone,
      AuthActions.actionRefreshTokenRequestDone,
      (state: AuthState, action) => ({
        ...state,
        user: action.user,
        isAuthenticated: true,
      })
    ),
    on(
      AuthActions.actionRefreshTokenRequestFail,
      (state: AuthState, action) => ({
        ...state,
        isAuthenticated: false,
        user: emptyUser,
      })
    ),
    on(AuthActions.actionLogoutRequestDone, (state: AuthState, action) => ({
      ...state,
      user: emptyUser,
      isAuthenticated: false,
    }))
  )(authState, authAction);
}
