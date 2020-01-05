import { Component, OnInit } from '@angular/core';
import { DialogChildComponent } from '../../share/modal/dialog-child.component';
import { ModalComponent } from '../../share/modal/modal.component';

@Component({
  selector: 'app-experiment-filter-dialog',
  templateUrl: './experiment-filter-dialog.component.html',
  styleUrls: ['./experiment-filter-dialog.component.sass']
})
export class ExperimentFilterDialogComponent extends DialogChildComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {

  }

  bind(modal: ModalComponent) {
    modal.title = 'Filtr experimentů';
    modal.confirmText = 'Filtrovat';
    modal.cancelText = 'Zrušit';
  }

  unbind(modal: ModalComponent) {
  }

}
