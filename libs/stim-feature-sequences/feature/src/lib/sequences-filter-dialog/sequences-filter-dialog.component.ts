import { Component} from '@angular/core';

import { Sequence } from '@stechy1/diplomka-share';

import { ListGroupSortFilterService} from '@neuro-client/stim-lib-list-utils';
import { FilterDialogComponent } from '@neuro-client/stim-lib-ui';


@Component({
  templateUrl: '../../../../../../apps/stimulator/src/app/share/filter-dialog/filter-dialog.component.html',
  styleUrls: ['../../../../../../apps/stimulator/src/app/share/filter-dialog/filter-dialog.component.sass']
})
export class SequencesFilterDialogComponent extends FilterDialogComponent<Sequence> {

  constructor(filter: ListGroupSortFilterService<Sequence>) {
    super(filter);
  }

}
