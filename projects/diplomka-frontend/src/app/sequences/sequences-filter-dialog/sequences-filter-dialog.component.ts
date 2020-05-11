import { Component} from '@angular/core';

import { Sequence } from '@stechy1/diplomka-share';

import { ListGroupSortFilterService} from 'stim-lib-list-utils';

import { FilterDialogComponent } from '../../share/filter-dialog/filter-dialog.component';

@Component({
  templateUrl: '../../share/filter-dialog/filter-dialog.component.html',
  styleUrls: ['../../share/filter-dialog/filter-dialog.component.sass']
})
export class SequencesFilterDialogComponent extends FilterDialogComponent<Sequence> {

  constructor(filter: ListGroupSortFilterService<Sequence>) {
    super(filter);
  }

}
