import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './modal.component';
import { ConfirmDialogComponent } from './confirm/confirm-dialog.component';
import { InformDialogComponent } from './inform/inform-dialog.component';
import { DialogChildsDirective } from './dialog-childs.directive';

@NgModule({
  declarations: [
    ModalComponent,
    DialogChildsDirective,
    ConfirmDialogComponent,
    InformDialogComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ModalComponent,
    DialogChildsDirective,
    ConfirmDialogComponent,
    InformDialogComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent,
    InformDialogComponent,
  ]
})
export class ModalModule {

}
