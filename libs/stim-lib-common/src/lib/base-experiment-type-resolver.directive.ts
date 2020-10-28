import { ComponentFactoryResolver, Directive, EventEmitter, Input, OnDestroy, OnInit, Output, Type, ViewContainerRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { NGXLogger } from 'ngx-logger';

import { ExperimentType } from '@stechy1/diplomka-share';

@Directive()
export abstract class BaseExperimentTypeResolverDirective<T> implements OnInit, OnDestroy {
  @Input() componentMap: { [experiment: string]: Type<unknown> };
  @Input() type: Observable<ExperimentType>;
  @Output() componentChange: EventEmitter<unknown> = new EventEmitter<unknown>();

  private _typeSubscription: Subscription;
  private _instance: T;

  protected constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly _viewContainerRef: ViewContainerRef,
    private readonly logger: NGXLogger
  ) {}

  get experimentComponent(): T {
    return this._instance;
  }

  ngOnInit(): void {
    this._typeSubscription = this.type.subscribe((type: ExperimentType) => {
      this._experimentTypeChange(type);
    });
  }

  ngOnDestroy(): void {
    this._typeSubscription.unsubscribe();
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
    this.logger.debug('Komponenta byla úspěšně inicializována.');
    this.componentChange.next(componentRef.instance);
    this._instance = componentRef.instance as T;
  }
}
