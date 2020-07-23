import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NGXLogger } from 'ngx-logger';
import { LocalStorageService } from 'angular-2-local-storage';

import { ResponseObject, User } from '@stechy1/diplomka-share';

import {
  TOKEN_AUTH_API_URL,
  TOKEN_USERS_API_URL,
} from '@diplomka-frontend/stim-lib-common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static readonly KEY_LOGGED = 'logged';

  constructor(
    @Inject(TOKEN_AUTH_API_URL) private readonly _accessPoint: string,
    @Inject(TOKEN_USERS_API_URL) private readonly _usersAccessPoint: string,
    private readonly _http: HttpClient,
    private readonly logger: NGXLogger,
    private readonly localStorage: LocalStorageService
  ) {}

  public register(user: User) {
    this.logger.info('Odesílám požadavek na registraci uživatele.');
    return this._http.post<ResponseObject<User>>(
      `${this._usersAccessPoint}/register`,
      user
    );
  }

  public login(user: User) {
    this.logger.info('Odesílám požadavek na přihlášení uživatele.');
    return this._http.post<ResponseObject<User>>(
      `${this._accessPoint}/login`,
      user
    );
  }

  public refreshToken() {
    if (this.isLogged) {
      this.logger.info('Odesílám požadavek na obnovení tokenu.');
      return this._http.patch<ResponseObject<User>>(
        `${this._accessPoint}/refresh-jwt`,
        null
      );
    } else {
      this.logger.info('Nemám žádný token, který bych mohl obnovit.');
      throw new Error();
    }
  }

  public logout() {
    this.logger.info('Odesílám požadavek na odhlášení uživatele.');
    return this._http.post(`${this._accessPoint}/logout`, null);
  }

  public get isLogged(): boolean {
    return this.localStorage.get<boolean>(AuthService.KEY_LOGGED);
  }

  public set isLogged(logged: boolean) {
    this.localStorage.set(AuthService.KEY_LOGGED, logged);
  }
}
