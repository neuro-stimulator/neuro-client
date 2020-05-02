import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

import { DialogChildComponent, ModalComponent } from 'stim-lib-modal';

import { ExperimentsSortFilter } from '../experiments-sort-filter.service';
import { FilterParameters, GroupByPosibilities, OrderByPosibilities, SortByPosibilities } from '../experiments-filter-parameters';

@Component({
  selector: 'stim-experiment-filter-dialog',
  templateUrl: './experiment-filter-dialog.component.html',
  styleUrls: ['./experiment-filter-dialog.component.sass']
})
export class ExperimentFilterDialogComponent extends DialogChildComponent implements OnInit {

  form: FormGroup = new FormGroup({
    groupBy: new FormControl(null),
    sortBy: new FormControl(null),
    orderBy: new FormControl(null),
  });

  private _confirmSubscription: Subscription;
  private _cancelSubscription: Subscription;
  private _showSubscription: Subscription;
  private _formValueChangesSubscription: Subscription;
  private _lastConfiguration: FilterParameters;

  constructor(private readonly filter: ExperimentsSortFilter) {
    super();
  }

  ngOnInit() {
    this._formValueChangesSubscription = this.form.valueChanges.subscribe((value: FilterParameters) => {
      if (value.groupBy !== this._lastConfiguration.groupBy) {
        this.filter.groupBy(value);
      } else {
        this.filter.sort(value);
      }
      this._lastConfiguration = value;
    });
  }

  bind(modal: ModalComponent) {
    modal.title = 'EXPERIMENTS.FILTER_DIALOG.TITLE';
    modal.confirmText = 'EXPERIMENTS.FILTER_DIALOG.CONFIRM';
    modal.cancelText = 'EXPERIMENTS.FILTER_DIALOG.CANCEL';
    this._confirmSubscription = modal.confirm.subscribe(() => { this.filter.filterParameters = this.form.value; });
    this._cancelSubscription = modal.cancel.subscribe(() => { this.filter.resetFilterParameters(); });
    this._showSubscription = modal.show.subscribe(() => {
      this.form.setValue(this.filter.filterParameters);
      this._lastConfiguration = this.filter.filterParameters;
    });
  }

  unbind(modal: ModalComponent) {
    this._confirmSubscription.unsubscribe();
    this._cancelSubscription.unsubscribe();
    this._showSubscription.unsubscribe();
    this._formValueChangesSubscription.unsubscribe();
  }

  get groupBy() {
    return this.form.get('groupBy');
  }

  get sortBy() {
    return this.form.get('sortBy');
  }

  get orderBy() {
    return this.form.get('orderBy');
  }

  get groupPosibilities(): GroupByPosibilities[] {
    return GroupByPosibilities.VALUES;
  }

  get sortPosibilities(): SortByPosibilities[] {
    return SortByPosibilities.VALUES;
  }

  get orderPosibilities(): OrderByPosibilities[] {
    return OrderByPosibilities.VALUES;
  }
}
