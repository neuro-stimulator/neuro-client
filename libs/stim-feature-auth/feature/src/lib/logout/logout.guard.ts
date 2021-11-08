import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthFacade, AuthState } from '@neuro-client/stim-feature-auth/domain';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class LogoutGuard implements CanActivate {
  constructor(private readonly facade: AuthFacade, private readonly router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.facade.state.pipe(
      map((state: AuthState) => {
        return state.isAuthenticated ? true : this.router.createUrlTree(['auth']);
      })
    );
  }
}
