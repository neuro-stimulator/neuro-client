import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperimentsComponent } from './experiments.component';

const routes: Routes = [
  {
    path: '',
    component: ExperimentsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ExperimentsRoutingModule {

}
