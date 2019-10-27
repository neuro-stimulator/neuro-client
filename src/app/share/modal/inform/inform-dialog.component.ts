import { Component} from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalComponent } from '../modal.component';
import { DialogChildComponent } from '../dialog-child.component';

@Component({
  templateUrl: './inform-dialog.component.html',
  styleUrls: ['./inform-dialog.component.sass']
})
export class InformDialogComponent extends DialogChildComponent {

  message: string;

  private _showSubscription: Subscription;

  constructor() {
    super();
  }

  private _prepareForm(args: any) {
    this.message = args.message;
  }

  bind(modal: ModalComponent) {
    modal.title = 'Potvrďte';
    modal.confirmText = 'Potvrzuji';
    modal.cancelText = 'Zrušit';
    modal.confirmClose = false;
    this._showSubscription =  modal.show.subscribe((args) => this._prepareForm(args[0]));
  }

  unbind(modal: ModalComponent) {
    this._showSubscription.unsubscribe();
  }

}
