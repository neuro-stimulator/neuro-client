import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';

import { ExperimentType } from 'diplomka-share';

import { ExperimentTypeNoneComponent } from './experiment-type-none/experiment-type-none.component';
import { ExperimentTypeErpComponent } from './experiment-type-erp/experiment-type-erp.component';

@Directive({
  selector: '[appExperimentTypeResolver]'
})
export class ExperimentTypeResolverDirective implements OnInit {

  private static readonly EXPERIMENT_COMPONENTS_BY_TYPE = {};

  @Input() type: Observable<ExperimentType>;

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver,
              private readonly _viewContainerRef: ViewContainerRef) {}

  static _initializeComponentMap() {
    ExperimentTypeResolverDirective.EXPERIMENT_COMPONENTS_BY_TYPE[ExperimentType.NONE] = ExperimentTypeNoneComponent;
    ExperimentTypeResolverDirective.EXPERIMENT_COMPONENTS_BY_TYPE[ExperimentType.ERP] = ExperimentTypeErpComponent;
  }

  private _experimentTypeChange(type: ExperimentType) {
    const component = ExperimentTypeResolverDirective.EXPERIMENT_COMPONENTS_BY_TYPE[type];
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);

    this._viewContainerRef.clear();
    const instance = this._viewContainerRef.createComponent(factory);
  }

  ngOnInit(): void {
    this.type.subscribe((type: ExperimentType) => {
      this._experimentTypeChange(type);
    });
  }

}
ExperimentTypeResolverDirective._initializeComponentMap();
