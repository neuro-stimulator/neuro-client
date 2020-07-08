import { Component} from '@angular/core';

import { ExperimentResult } from '@stechy1/diplomka-share';

import { ListGroupSortFilterService} from '@diplomka-frontend/stim-lib-list-utils';

import { FilterDialogComponent } from '../../share/filter-dialog/filter-dialog.component';

@Component({
  templateUrl: '../../share/filter-dialog/filter-dialog.component.html',
  styleUrls: ['../../share/filter-dialog/filter-dialog.component.sass']
})
export class ExperimentResultsFilterDialogComponent extends FilterDialogComponent<ExperimentResult> {

  constructor(filter: ListGroupSortFilterService<ExperimentResult>) {
    super(filter);
  }

}