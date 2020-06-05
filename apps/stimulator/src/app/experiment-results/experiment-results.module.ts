import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { ExperimentResult } from '@stechy1/diplomka-share';

import { StimLibUiModule } from "@diplomka-frontend/stim-lib-ui";
import { StimLibListUtilsModule } from "@diplomka-frontend/stim-lib-list-utils";

import { ShareModule } from '../share/share.module';
import { ExperimentResultsRoutingModule } from './experiment-results-routing.module';
import { ExperimentResultsComponent } from './experiment-results.component';
import { ExperimentResultItemListComponent } from './experiment-result-item-list/experiment-result-item-list.component';
import { ExperimentResultGhostItemListComponent } from './experiment-result-ghost-item-list/experiment-result-ghost-item-list.component';
import { ExperimentResultComponent } from './experiment-result/experiment-result.component';
import { ExperimentResultsFilterDialogComponent } from './experiment-results-filter-dialog/experiment-results-filter-dialog.component';
import { GROUP_BY_FILTERS, SORT_BY_FILTERS } from './experiment-results-filter-parameters';

@NgModule({
  declarations: [
    ExperimentResultsComponent,
    ExperimentResultItemListComponent,
    ExperimentResultGhostItemListComponent,
    ExperimentResultComponent,
    ExperimentResultsFilterDialogComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),

    ExperimentResultsRoutingModule,
    ShareModule,
    StimLibUiModule,
    StimLibListUtilsModule.forChild<ExperimentResult>({
      storageSuffix: 'experiment-results',
      fuseKeys: ['name'],
      groupBy: GROUP_BY_FILTERS,
      sortBy: SORT_BY_FILTERS
    })
  ]
})
export class ExperimentResultsModule {

}
