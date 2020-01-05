import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExperimentsComponent } from './experiments.component';
import { ExperimentTypeComponent } from './experiment-type/experiment-type.component';
import { ExperimentsButtonsAddonComponent } from '../share/buttons-addons/experiments-buttons-addon/experiments-buttons-addon.component';

const routes: Routes = [
  {
    path: '',
    component: ExperimentsComponent,
    data: {title: 'Experimenty', buttonsAddon: ExperimentsButtonsAddonComponent}
  },
  {
    path: ':type',
    redirectTo: ':type/new'
  },
  {
    path: ':type/new',
    component: ExperimentTypeComponent,
    data: {title: 'Nový experiment'}
  },
  {
    path: ':type/:id',
    component: ExperimentTypeComponent,
    data: {title: 'Konfigurace experimentu', applyCustomNavColor: true}
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
