import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDialogChilds]'
})
export class DialogChildsDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
