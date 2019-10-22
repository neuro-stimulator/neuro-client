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
    component: ExperimentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
