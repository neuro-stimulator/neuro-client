import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExperimentsComponent } from './experiments/experiments.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'experiments'
  },
  {
    path: 'experiments',
    data: {title: 'Experimenty'},
    // component: ExperimentsComponent
    loadChildren: () => import('./experiments/experiments.module').then(mod => mod.ExperimentsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
