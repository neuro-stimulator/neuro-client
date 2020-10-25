import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { ModalComponent } from './modal.component';
import { DialogChildsDirective } from './dialog-childs.directive';
import { ConfirmDialogComponent } from './confirm/confirm-dialog.component';
import { InformDialogComponent } from './inform/inform-dialog.component';

@NgModule({
  declarations: [
    ModalComponent,
    DialogChildsDirective,
    ConfirmDialogComponent,
    InformDialogComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ],
  exports: [
    ModalComponent,
    DialogChildsDirective,
    ConfirmDialogComponent,
    InformDialogComponent
  ]
})
export class StimLibModalModule {
}
