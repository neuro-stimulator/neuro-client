import { Component} from '@angular/core';

import { Experiment } from '@stechy1/diplomka-share';

import { ListGroupSortFilterService} from '@diplomka-frontend/stim-lib-list-utils';
import { FilterDialogComponent } from "@diplomka-frontend/stim-lib-ui";

@Component({
  templateUrl: '../../../../../../apps/stimulator/src/app/share/filter-dialog/filter-dialog.component.html',
  styleUrls: ['../../../../../../apps/stimulator/src/app/share/filter-dialog/filter-dialog.component.sass']
})
export class ExperimentsFilterDialogComponent extends FilterDialogComponent<Experiment> {

  constructor(filter: ListGroupSortFilterService<Experiment>) {
    super(filter);
  }

}
