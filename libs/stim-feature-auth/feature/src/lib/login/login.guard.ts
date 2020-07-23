import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  AuthFacade,
  AuthState,
} from '@diplomka-frontend/stim-feature-auth/domain';
import { map, take, tap } from 'rxjs/operators';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private readonly facade: AuthFacade,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.facade.state.pipe(
      take(1),
      map((state: AuthState) => {
        return state.isAuthenticated
          ? this.router.createUrlTree(['profile'])
          : true;
      })
    );
  }
}
