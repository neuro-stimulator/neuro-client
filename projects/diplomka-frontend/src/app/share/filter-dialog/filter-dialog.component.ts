import { OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

import { DialogChildComponent, ModalComponent } from 'stim-lib-modal';
import { GroupFilter, ListFilterParameters, ListGroupSortFilterService, OrderFilter, SortFilter } from 'stim-lib-list-utils';

export abstract class FilterDialogComponent<T> extends DialogChildComponent implements OnInit {

  form: FormGroup = new FormGroup({
    groupBy: new FormControl(null),
    sortBy: new FormControl(null),
    orderBy: new FormControl(null),
  });

  private _confirmSubscription: Subscription;
  private _cancelSubscription: Subscription;
  private _showSubscription: Subscription;
  private _formValueChangesSubscription: Subscription;
  private _lastConfiguration: ListFilterParameters;

  constructor(private readonly filter: ListGroupSortFilterService<T>) {
    super();
  }

  ngOnInit() {
    this._formValueChangesSubscription = this.form.valueChanges.subscribe((value: ListFilterParameters) => {
      if (value.groupBy !== this._lastConfiguration.groupBy) {
        this.filter.groupBy(value);
      } else {
        this.filter.sort(value);
      }
      this._lastConfiguration = value;
    });
  }

  bind(modal: ModalComponent) {
    modal.title = 'SHARE.FILTER_DIALOG.TITLE';
    modal.confirmText = 'SHARE.FILTER_DIALOG.CONFIRM';
    modal.cancelText = 'SHARE.FILTER_DIALOG.CANCEL';
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

  get groupByFilters(): GroupFilter<T>[] {
    return this.filter.groupByFilters;
  }

  get sortByFilters(): SortFilter<T>[] {
    return this.filter.sortByFilters;
  }

  get orderByFilters(): OrderFilter<T>[] {
    return this.filter.orderByFilters;
  }
}
