import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[stimLibModalDialogChilds]'
})
export class DialogChildsDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
