import { Component, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { DialogChildComponent, ModalComponent } from '@diplomka-frontend/stim-lib-modal';
import { SequenceFastDialogResult } from './sequence-fast-dialog.args';

@Component({
  templateUrl: './sequence-fast-dialog.component.html',
  styleUrls: ['./sequence-fast-dialog.component.sass'],
})
export class SequenceFastDialogComponent extends DialogChildComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    size: new FormControl(null, [Validators.required, Validators.min(1)]),
  });

  private _confirmSubscription: Subscription;

  private readonly formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  private readonly formResult: EventEmitter<SequenceFastDialogResult> = new EventEmitter<SequenceFastDialogResult>();

  private _formInvalidSubscription: Subscription;

  constructor() {
    super();

    this._formInvalidSubscription = this.form.valueChanges.subscribe(() => {
      this.formInvalid.emit(this.form.invalid);
    });
  }

  private _handleConfirm() {
    this.formResult.emit(this.form.value);
  }

  bind(modal: ModalComponent) {
    modal.title = 'Nová sequence';
    modal.confirmText = 'Vytvořit';
    modal.cancelText = 'Zrušit';
    modal.confirmClose = false;
    modal.confirmDisabled = this.formInvalid;
    modal.result = this.formResult;
    this._confirmSubscription = modal.confirm.subscribe(() => this._handleConfirm());
  }

  unbind() {
    this._confirmSubscription.unsubscribe();
    this._formInvalidSubscription.unsubscribe();
  }

  get name() {
    return this.form.get('name');
  }

  get size() {
    return this.form.get('size');
  }
}
