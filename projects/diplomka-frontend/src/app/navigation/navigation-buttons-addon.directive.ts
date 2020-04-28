import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appNavigationButtonsAddon]'
})
export class NavigationButtonsAddonDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
