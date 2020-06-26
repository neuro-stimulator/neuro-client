import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from "@ngx-translate/core";

import { ExperimentResult } from "@stechy1/diplomka-share";

import { StimLibUiModule } from "@diplomka-frontend/stim-lib-ui";
import { StimLibListUtilsModule } from "@diplomka-frontend/stim-lib-list-utils";

import { ExperimentResultsComponent } from "./experiment-results.component";
import { ExperimentResultsItemListComponent } from "./experiment-result-item-list/experiment-results-item-list.component";
import { ExperimentResultsGhostItemListComponent } from "./experiment-result-ghost-item-list/experiment-results-ghost-item-list.component";
import { ExperimentResultComponent } from "./experiment-result/experiment-result.component";
import { ExperimentResultsFilterDialogComponent } from "./experiment-results-filter-dialog/experiment-results-filter-dialog.component";
import { ExperimentResultsRoutingModule } from "./experiment-results-routing.module";
import { GROUP_BY_FILTERS, SORT_BY_FILTERS } from "./experiment-results-filter-parameters";
import { StimFeatureExperimentResultsDomainModule } from "@diplomka-frontend/stim-feature-experiment-results/domain";

@NgModule({
  declarations: [
    ExperimentResultsComponent,
    ExperimentResultsItemListComponent,
    ExperimentResultsGhostItemListComponent,
    ExperimentResultComponent,
    ExperimentResultsFilterDialogComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),

    StimFeatureExperimentResultsDomainModule,
    ExperimentResultsRoutingModule,
    StimLibUiModule,
    StimLibListUtilsModule.forChild<ExperimentResult>({
      storageSuffix: 'experiment-results',
      fuseKeys: ['name'],
      groupBy: GROUP_BY_FILTERS,
      sortBy: SORT_BY_FILTERS
    })
  ]
})
export class StimFeatureExperimentResultsFeatureModule {}
