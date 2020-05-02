import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[stimLibDialogChilds]'
})
export class DialogChildsDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
