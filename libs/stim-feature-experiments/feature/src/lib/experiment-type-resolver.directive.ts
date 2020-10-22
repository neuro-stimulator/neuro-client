import {
  ComponentFactoryResolver,
  Directive,
  ViewContainerRef,
} from '@angular/core';

import { BaseExperimentTypeResolverDirective } from '@diplomka-frontend/stim-lib-common';

import { BaseExperimentTypeComponent } from './experiment-type/base-experiment-type.component';
import { NGXLogger } from 'ngx-logger';
import { Experiment, Output } from '@stechy1/diplomka-share';

@Directive({
  selector: '[stimFeatureExperimentsTypeResolver]',
})
export class ExperimentTypeResolverDirective extends BaseExperimentTypeResolverDirective<
  BaseExperimentTypeComponent<Experiment<Output>, Output>
> {
  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    _viewContainerRef: ViewContainerRef,
    logger: NGXLogger
  ) {
    super(componentFactoryResolver, _viewContainerRef, logger);
  }
}
