import {
  ComponentFactoryResolver,
  Directive,
  ViewContainerRef,
} from '@angular/core';

import { BaseExperimentTypeResolverDirective } from '@diplomka-frontend/stim-lib-common';

import { BaseExperimentTypeComponent } from './experiment-type/base-experiment-type.component';
import { NGXLogger } from 'ngx-logger';

@Directive({
  selector: '[stimFeatureExperimentsTypeResolver]',
})
export class ExperimentTypeResolverDirective extends BaseExperimentTypeResolverDirective<
  BaseExperimentTypeComponent<any>
> {
  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    _viewContainerRef: ViewContainerRef,
    logger: NGXLogger
  ) {
    super(componentFactoryResolver, _viewContainerRef, logger);
  }
}
