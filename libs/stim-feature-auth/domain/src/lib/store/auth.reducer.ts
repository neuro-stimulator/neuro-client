import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';

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
    on(AuthActions.actionLoginRequestDone, (state: AuthState, action) => ({
      ...state,
      user: action.user,
      isAuthenticated: true,
      serializedRequest: undefined
    })),
    on(AuthActions.actionRefreshTokenRequestDone, (state: AuthState, action) => ({
      ...state,
      user: action.user,
      isAuthenticated: true,
    })),
    on(AuthActions.actionRefreshTokenRequestFail, (state: AuthState) => ({
      ...state,
      isAuthenticated: false,
      user: emptyUser,
      serializedRequest: undefined
    })),
    on(AuthActions.actionLogoutRequestDone, (state: AuthState) => ({
      ...state,
      user: emptyUser,
      isAuthenticated: false,
      serializedRequest: undefined
    })),
    on(AuthActions.actionSaveRequestDone, (state: AuthState, action) => ({
      ...state,
      serializedRequest: action.req
    })),
    on(AuthActions.actionCallRequestDone, (state: AuthState) => ({
      ...state,
      serializedRequest: undefined
    }))
  )(authState, authAction);
}

export const authFeature = createFeatureSelector<AuthState>(authReducerKey);
