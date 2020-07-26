import { BaseExperimentTypeResolverDirective } from '@diplomka-frontend/stim-lib-common';
import {
  ComponentFactoryResolver,
  Directive,
  ViewContainerRef,
} from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Directive({
  selector: '[stimFeaturePlayerExperimentTypeResolver]',
})
export class PlayerExperimentTypeResolverDirective extends BaseExperimentTypeResolverDirective<
  any
> {
  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    viewContainerRef: ViewContainerRef,
    logger: NGXLogger
  ) {
    super(componentFactoryResolver, viewContainerRef, logger);
  }
}
