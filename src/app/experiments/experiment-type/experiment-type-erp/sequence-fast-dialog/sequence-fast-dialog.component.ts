import { Component, EventEmitter } from '@angular/core';
import { DialogChildComponent } from '../../../../share/modal/dialog-child.component';
import { ModalComponent } from '../../../../share/modal/modal.component';
import { of, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sequence-fast-dialog',
  templateUrl: './sequence-fast-dialog.component.html',
  styleUrls: ['./sequence-fast-dialog.component.sass']
})
export class SequenceFastDialogComponent extends DialogChildComponent {

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    size: new FormControl(null, [Validators.required, Validators.min(1)])
  });

  private _confirmSubscription: Subscription;
  private _cancelSubscription: Subscription;

  private _handleConfirmDialog: () => void;
  private _handleCancelDialog: () => void;

  private formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _formInvalidSubscription: Subscription;

  constructor() {
    super();

    this._formInvalidSubscription = this.form.valueChanges.subscribe(value => {
      this.formInvalid.next(this.form.invalid);
    });
  }

  private _handleConfirm() {
    this._handleConfirmDialog();
  }

  private _handleNotConfirm() {
    this._handleCancelDialog();
  }

  bind(modal: ModalComponent) {
    modal.title = 'Nová sequence';
    modal.confirmText = 'Vytvořit';
    modal.cancelText = 'Zrušit';
    modal.confirmClose = false;
    modal.confirmDisabled = this.formInvalid;
    this._confirmSubscription = modal.confirm.subscribe(() => this._handleConfirm());
    this._cancelSubscription = modal.cancel.subscribe(() => this._handleNotConfirm());
  }

  unbind(modal: ModalComponent) {
    this._confirmSubscription.unsubscribe();
    this._cancelSubscription.unsubscribe();
    this._formInvalidSubscription.unsubscribe();
  }

  get name() {
    return this.form.get('name');
  }

  get size() {
    return this.form.get('size');
  }
}
