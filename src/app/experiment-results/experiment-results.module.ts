import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperimentResultsRoutingModule } from './experiment-results-routing.module';
import { ExperimentResultsComponent } from './experiment-results.component';
import { ExperimentResultItemComponent } from './experiment-result-item/experiment-result-item.component';
import { ExperimentResultGhostItemComponent } from './experiment-result-ghost-item/experiment-result-ghost-item.component';
import { ExperimentResultComponent } from './experiment-result/experiment-result.component';

@NgModule({
  declarations: [
    ExperimentResultsComponent,
    ExperimentResultItemComponent,
    ExperimentResultGhostItemComponent,
    ExperimentResultComponent
  ],
  imports: [
    CommonModule,
    ExperimentResultsRoutingModule
  ]
})
export class ExperimentResultsModule {

}
