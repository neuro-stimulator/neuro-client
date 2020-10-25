import { createAction, props } from '@ngrx/store';

import { User } from '@stechy1/diplomka-share';

export const actionRegisterRequest = createAction('[Auth] register request', props<{ user: User }>());
export const actionRegisterRequestDone = createAction('[Auth] register request done', props<{ user: User }>());
export const actionRegisterRequestFail = createAction('[Auth] register request fail');

export const actionLoginRequest = createAction('[Auth] login request', props<{ user: User }>());
export const actionLoginRequestDone = createAction('[Auth] login request done', props<{ user: User }>());
export const actionLoginRequestFail = createAction('[Auth] login request fail');

export const actionRefreshTokenRequest = createAction('[Auth] refresh token request');
export const actionRefreshTokenRequestDone = createAction('[Auth] refresh token request done', props<{ user: User }>());
export const actionRefreshTokenRequestFail = createAction('[Auth] refresh token request fail');

export const actionLogoutRequest = createAction('[Auth] logout request');
export const actionLogoutRequestDone = createAction('[Auth] logout request done');
export const actionLogoutRequestFail = createAction('[Auth] logout request fail');
