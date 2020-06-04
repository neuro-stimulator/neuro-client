import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { ExperimentResult } from '@stechy1/diplomka-share';

import { ModalModule } from '@diplomka-frontend/stim-lib-modal';
import { FabModule } from '@diplomka-frontend/stim-lib-fab';
import { ListUtilsModule } from '@diplomka-frontend/stim-lib-list-utils';

import { ExperimentViewerModule } from '../share/experiment-viewer/experiment-viewer.module';
import { ShareModule } from '../share/share.module';
import { ListButtonsAddonModule } from '../share/list-buttons-addon/list-buttons-addon.module';
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
    ExperimentViewerModule,
    ModalModule,
    FabModule,
    ShareModule,
    ReactiveFormsModule,
    ListButtonsAddonModule,
    ListUtilsModule.forChild<ExperimentResult>({
      storageSuffix: 'experiment-results',
      fuseKeys: ['name'],
      groupBy: GROUP_BY_FILTERS,
      sortBy: SORT_BY_FILTERS
    })
  ]
})
export class ExperimentResultsModule {

}
