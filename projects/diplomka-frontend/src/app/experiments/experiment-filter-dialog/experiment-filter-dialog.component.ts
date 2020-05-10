import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

import { Experiment } from '@stechy1/diplomka-share';

import { DialogChildComponent, ModalComponent } from 'stim-lib-modal';
import { GroupFilter, ListFilterParameters, ListGroupSortFilterService, OrderFilter, SortFilter } from 'stim-lib-list-utils';
import { FilterDialogComponent } from '../../share/filter-dialog/filter-dialog.component';

@Component({
  selector: 'stim-experiment-filter-dialog',
  templateUrl: '../../share/filter-dialog/filter-dialog.component.html',
  styleUrls: ['../../share/filter-dialog/filter-dialog.component.sass']
})
export class ExperimentFilterDialogComponent extends FilterDialogComponent<Experiment> {

  constructor(filter: ListGroupSortFilterService<Experiment>) {
    super(filter);
  }

}
