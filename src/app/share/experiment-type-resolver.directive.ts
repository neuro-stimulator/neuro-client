import { ComponentFactoryResolver, Directive, EventEmitter, Input, OnDestroy, OnInit, Output, Type, ViewContainerRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { ExperimentType } from 'diplomka-share';
import { NGXLogger } from 'ngx-logger';

@Directive({
  selector: '[appExperimentTypeResolver]'
})
export class ExperimentTypeResolverDirective implements OnInit, OnDestroy {

  @Input() componentMap: {[experiment: string]: Type<any>};
  @Input() type: Observable<ExperimentType>;
  @Output() componentChange: EventEmitter<any> = new EventEmitter<any>();

  private _typeSubscription: Subscription;

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver,
              private readonly _viewContainerRef: ViewContainerRef,
              private readonly logger: NGXLogger) {
  }

  private _experimentTypeChange(type: ExperimentType) {
    if (type === ExperimentType.NONE) {
      return;
    }

    this.logger.debug(`Budu inicializovat komponentu pro experiment typu: ${ExperimentType[type]}.`);
    const component = this.componentMap[type];
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);

    this._viewContainerRef.clear();
    const componentRef = this._viewContainerRef.createComponent(factory);
    this.logger.debug(`Komponenta byla úspěšně inicializována.`);
    this.componentChange.next(componentRef.instance);
  }

  ngOnInit(): void {
    this._typeSubscription = this.type.subscribe((type: ExperimentType) => {
      this._experimentTypeChange(type);
    });
  }

  ngOnDestroy(): void {
    this._typeSubscription.unsubscribe();
  }

}
