import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[libDialogChilds]'
})
export class DialogChildsDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
