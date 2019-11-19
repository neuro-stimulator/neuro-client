import { ComponentFactoryResolver, Directive, Input, OnInit, Type, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';

import { ExperimentType } from 'diplomka-share';

@Directive({
  selector: '[appExperimentTypeResolver]'
})
export class ExperimentTypeResolverDirective implements OnInit {

  @Input() componentMap: {[experiment: string]: Type<any>};
  @Input() type: Observable<ExperimentType>;

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver,
              private readonly _viewContainerRef: ViewContainerRef) {
  }

  private _experimentTypeChange(type: ExperimentType) {
    const component = this.componentMap[type];
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);

    this._viewContainerRef.clear();
    this._viewContainerRef.createComponent(factory);
  }

  ngOnInit(): void {
    this.type.subscribe((type: ExperimentType) => {
      this._experimentTypeChange(type);
    });
  }

}
