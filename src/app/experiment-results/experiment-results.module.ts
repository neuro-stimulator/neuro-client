import { NgModule } from '@angular/core';
import { ExperimentResultsComponent } from './experiment-results.component';
import { ExperimentResultsRoutingModule } from './experiment-results-routing.module';
import { ExperimentResultItemComponent } from './experiment-result-item/experiment-result-item.component';
import { ExperimentResultGhostItemComponent } from './experiment-result-ghost-item/experiment-result-ghost-item.component';

@NgModule({
  declarations: [
    ExperimentResultsComponent,
    ExperimentResultItemComponent,
    ExperimentResultGhostItemComponent
  ],
  imports: [
    ExperimentResultsRoutingModule
  ]
})
export class ExperimentResultsModule {

}
