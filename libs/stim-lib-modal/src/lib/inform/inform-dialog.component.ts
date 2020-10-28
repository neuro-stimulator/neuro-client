import { Component } from '@angular/core';

import { Subscription } from 'rxjs';

import { ModalComponent } from '../modal.component';
import { DialogChildComponent } from '../dialog-child.component';
import { InformDialogArgs } from './inform-dialog.args';

@Component({
  templateUrl: './inform-dialog.component.html',
  styleUrls: ['./inform-dialog.component.sass'],
})
export class InformDialogComponent extends DialogChildComponent {
  message: string;

  private _showSubscription: Subscription;

  constructor() {
    super();
  }

  bind(modal: ModalComponent) {
    modal.title = 'SHARE.DIALOGS.INFORMATION.TITLE';
    modal.confirmText = 'SHARE.DIALOGS.INFORMATION.CONFIRM';
    modal.cancelText = 'SHARE.DIALOGS.INFORMATION.CANCEL';
    modal.confirmClose = false;
    this._showSubscription = modal.show.subscribe((args) => this._prepareForm(args[0]));
  }

  unbind() {
    this._showSubscription.unsubscribe();
  }

  private _prepareForm(args: InformDialogArgs) {
    this.message = args.message;
  }
}
