import { Component } from '@angular/core';

import { of, Subscription } from 'rxjs';

import { DialogChildComponent } from '../dialog-child.component';
import { ModalComponent } from '../modal.component';

@Component({
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.sass']
})
export class ConfirmDialogComponent extends DialogChildComponent {

  message: string;

  private _confirmSubscription: Subscription;
  private _cancelSubscription: Subscription;
  private _showSubscription: Subscription;

  private _handleConfirmDialog: () => void;
  private _handleCancelDialog: () => void;

  constructor() {
    super();
  }

  private _prepareForm(args: any) {
    this.message = args.message;
    this._handleConfirmDialog = args.confirm || (() => {
    });
    this._handleCancelDialog = args.cancel || (() => {
    });
  }

  private _handleConfirm() {
    this._handleConfirmDialog();
  }

  private _handleNotConfirm() {
    this._handleCancelDialog();
  }

  bind(modal: ModalComponent) {
    modal.title = 'SHARE.DIALOGS.CONFIRMATION.TITLE';
    modal.confirmText = 'SHARE.DIALOGS.CONFIRMATION.CONFIRM';
    modal.cancelText = 'SHARE.DIALOGS.CONFIRMATION.CANCEL';
    modal.confirmClose = false;
    modal.confirmDisabled = of(false);
    this._confirmSubscription = modal.confirm.subscribe(() => this._handleConfirm());
    this._cancelSubscription = modal.cancel.subscribe(() => this._handleNotConfirm());
    this._showSubscription = modal.show.subscribe((args) => this._prepareForm(args[0]));
  }

  unbind(modal: ModalComponent) {
    this._confirmSubscription.unsubscribe();
    this._cancelSubscription.unsubscribe();
    this._showSubscription.unsubscribe();
  }
}
