import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperimentResultsComponent } from './experiment-results.component';

const routes: Routes = [
  {
    path: '',
    component: ExperimentResultsComponent,
    data: {title: 'Výsledky experimentů'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperimentResultsRoutingModule {

}
