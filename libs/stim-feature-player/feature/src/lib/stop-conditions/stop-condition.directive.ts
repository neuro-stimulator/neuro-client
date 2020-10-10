import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[stimFeatureStopCondition]',
})
export class StopConditionDirective {
  constructor(public readonly viewContainerRef: ViewContainerRef) {}
}
