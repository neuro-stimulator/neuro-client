import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { ModalModule } from 'lib-modal';

import { ExperimentViewerModule } from '../share/experiment-viewer/experiment-viewer.module';
import { FabModule } from '../share/fab/fab.module';
import { ShareModule } from '../share/share.module';
import { ExperimentResultsRoutingModule } from './experiment-results-routing.module';
import { ExperimentResultsComponent } from './experiment-results.component';
import { ExperimentResultItemListComponent } from './experiment-result-item-list/experiment-result-item-list.component';
import { ExperimentResultGhostItemListComponent } from './experiment-result-ghost-item-list/experiment-result-ghost-item-list.component';
import { ExperimentResultComponent } from './experiment-result/experiment-result.component';

@NgModule({
  declarations: [
    ExperimentResultsComponent,
    ExperimentResultItemListComponent,
    ExperimentResultGhostItemListComponent,
    ExperimentResultComponent
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
  ]
})
export class ExperimentResultsModule {

}
