import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperimentResultsComponent } from './experiment-results.component';
import { ExperimentResultComponent } from './experiment-result/experiment-result.component';

const routes: Routes = [
  {
    path: 'list',
    component: ExperimentResultsComponent,
    data: { title: 'EXPERIMENT_RESULTS.TITLE' }
  },
  {
    path: ':id',
    component: ExperimentResultComponent,
    data: { title: 'EXPERIMENT_RESULTS.EXPERIMENT_RESULT.TITLE', applyCustomNavColor: true }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperimentResultsRoutingModule {

}
