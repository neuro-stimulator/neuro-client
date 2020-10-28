import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree } from '@angular/router';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class ExperimentsDeactivate implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: ComponentCanDeactivate): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canDeactivate() ? true : confirm();
  }
}
