import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SimulationComponent } from './simulation.component';

const routes: Routes = [
  {
    path: ':type/:id',
    pathMatch: 'prefix',
    component: SimulationComponent,
    data: {title: 'Simulace experimentu'}
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
export class SimulationRoutingModule {

}
