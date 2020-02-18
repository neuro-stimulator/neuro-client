import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ExperimentType } from '@stechy1/diplomka-share';

@Injectable()
export class ExperimentsActivate implements CanActivate {

  private static readonly SUPPORTED_EXPERIMENTS: string[] = [
    ExperimentType[ExperimentType.ERP].toLowerCase(),
    ExperimentType[ExperimentType.CVEP].toLowerCase(),
    ExperimentType[ExperimentType.FVEP].toLowerCase(),
    ExperimentType[ExperimentType.TVEP].toLowerCase(),
  ];

  constructor(private readonly router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!ExperimentsActivate.SUPPORTED_EXPERIMENTS.includes(route.params.type)) {
      return this.router.parseUrl('/experiments');
    }

    return true;
  }

}
