import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperimentResultsRoutingModule } from './experiment-results-routing.module';
import { ExperimentResultsComponent } from './experiment-results.component';
import { ExperimentResultItemListComponent } from './experiment-result-item-list/experiment-result-item-list.component';
import { ExperimentResultGhostItemListComponent } from './experiment-result-ghost-item-list/experiment-result-ghost-item-list.component';
import { ExperimentResultComponent } from './experiment-result/experiment-result.component';
import { ExperimentViewerModule } from '../share/experiment-viewer/experiment-viewer.module';
import { ModalModule } from '../share/modal/modal.module';

@NgModule({
  declarations: [
    ExperimentResultsComponent,
    ExperimentResultItemListComponent,
    ExperimentResultGhostItemListComponent,
    ExperimentResultComponent
  ],
  imports: [
    CommonModule,
    ExperimentResultsRoutingModule,
    ExperimentViewerModule,
    ModalModule
  ]
})
export class ExperimentResultsModule {

}
