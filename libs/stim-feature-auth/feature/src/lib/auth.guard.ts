import { CanActivate, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthFacade, AuthState } from '@neuro-client/stim-feature-auth/domain';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly facade: AuthFacade, private readonly router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.facade.state.pipe(
      map((state: AuthState) => {
        return state.isAuthenticated ? this.router.createUrlTree(['profile']) : this.router.createUrlTree(['auth', 'login']);
      })
    );
  }
}
