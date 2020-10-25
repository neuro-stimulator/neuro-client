import { Directive, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

import { DialogChildComponent, ModalComponent } from '@diplomka-frontend/stim-lib-modal';
import { GroupFilter, ListFilterParameters, ListGroupSortFilterService, OrderFilter, SortFilter } from '@diplomka-frontend/stim-lib-list-utils';

/**
 * Generický filtrovací dialog založení na službě z knihovny pro seskupování, třídění a řazení.
 */
@Directive()
export abstract class FilterDialogComponent<T> extends DialogChildComponent implements OnInit {

  form: FormGroup = new FormGroup({
    groupBy: new FormControl(null),
    sortBy: new FormControl(null),
    orderBy: new FormControl(null)
  });

  private _confirmSubscription: Subscription;
  private _cancelSubscription: Subscription;
  private _showSubscription: Subscription;
  private _formValueChangesSubscription: Subscription;
  private _lastConfiguration: ListFilterParameters;

  protected constructor(private readonly filter: ListGroupSortFilterService<T>) {
    super();
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
    modal.title = 'SHARE.DIALOGS.FILTER.TITLE';
    modal.confirmText = 'SHARE.DIALOGS.FILTER.CONFIRM';
    modal.cancelText = 'SHARE.DIALOGS.FILTER.CANCEL';
    this._confirmSubscription = modal.confirm.subscribe(() => {
      this.filter.filterParameters = this.form.value;
    });
    this._cancelSubscription = modal.cancel.subscribe(() => {
      this.filter.resetFilterParameters();
    });
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
}
