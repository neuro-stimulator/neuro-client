import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NGXLogger } from 'ngx-logger';

import { ResponseObject, User } from '@stechy1/diplomka-share';

import {
  TOKEN_AUTH_API_URL,
  TOKEN_USERS_API_URL,
} from '@diplomka-frontend/stim-lib-common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject(TOKEN_AUTH_API_URL) private readonly _accessPoint: string,
    @Inject(TOKEN_USERS_API_URL) private readonly _usersAccessPoint: string,
    protected readonly _http: HttpClient,
    protected readonly logger: NGXLogger
  ) {}

  public register(user: User) {
    return this._http.post<ResponseObject<User>>(
      `${this._usersAccessPoint}/register`,
      user
    );
  }

  public login(user: User) {
    return this._http.post<ResponseObject<User>>(
      `${this._accessPoint}/login`,
      user
    );
  }

  public refreshToken() {
    return this._http.get(`${this._accessPoint}/refresh-jwt`);
  }

  public logout() {
    return this._http.post(`${this._accessPoint}/logout`, null);
  }
}
