import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[stimNavigationButtonsAddon]'
})
export class NavigationButtonsAddonDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
