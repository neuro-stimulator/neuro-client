import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[stimFeatureNavigationButtonsAddon]'
})
export class NavigationButtonsAddonDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
