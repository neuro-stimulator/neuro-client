import { ComponentFactoryResolver, ComponentRef, Directive, EventEmitter, Input, OnInit, Output, Type, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';

import { ExperimentType } from 'diplomka-share';

@Directive({
  selector: '[appExperimentTypeResolver]'
})
export class ExperimentTypeResolverDirective implements OnInit {

  @Input() componentMap: {[experiment: string]: Type<any>};
  @Input() type: Observable<ExperimentType>;
  @Output() componentChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver,
              private readonly _viewContainerRef: ViewContainerRef) {
  }

  private _experimentTypeChange(type: ExperimentType) {
    const component = this.componentMap[type];
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);

    this._viewContainerRef.clear();
    const componentRef = this._viewContainerRef.createComponent(factory);
    this.componentChange.next(componentRef.instance);
  }

  ngOnInit(): void {
    this.type.subscribe((type: ExperimentType) => {
      this._experimentTypeChange(type);
    });
  }

}
