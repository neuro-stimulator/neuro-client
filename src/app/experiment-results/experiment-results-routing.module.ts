import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperimentResultsComponent } from './experiment-results.component';
import { ExperimentResultComponent } from './experiment-result/experiment-result.component';

const routes: Routes = [
  {
    path: '',
    component: ExperimentResultsComponent,
    data: {title: 'Výsledky experimentů'}
  },
  {
    path: ':id',
    component: ExperimentResultComponent,
    data: {title: 'Výsledek experimentu', applyCustomNavColor: true}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperimentResultsRoutingModule {

}
