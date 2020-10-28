import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ExperimentType } from '@stechy1/diplomka-share';
import { NGXLogger } from 'ngx-logger';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ExperimentsActivate implements CanActivate {
  // TODO inject from server
  private static readonly SUPPORTED_EXPERIMENTS: string[] = [
    ExperimentType[ExperimentType.ERP].toLowerCase(),
    ExperimentType[ExperimentType.CVEP].toLowerCase(),
    ExperimentType[ExperimentType.FVEP].toLowerCase(),
    ExperimentType[ExperimentType.TVEP].toLowerCase(),
    ExperimentType[ExperimentType.REA].toLowerCase(),
  ];

  constructor(private readonly router: Router, private readonly logger: NGXLogger, private readonly toastr: ToastrService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!ExperimentsActivate.SUPPORTED_EXPERIMENTS.includes(route.params.type)) {
      this.logger.warn('Uživatel se snaží zobrazit nepodporovaný experiment!');
      this.toastr.warning(`Nepodporovaný typ experimentu! [${route.params.type}]`);
      return this.router.parseUrl('/experiments');
    }

    return true;
  }
}
