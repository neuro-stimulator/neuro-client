import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExperimentsButtonsAddonComponent } from '../share/buttons-addons/experiments-buttons-addon/experiments-buttons-addon.component';
import { ExperimentsComponent } from './experiments.component';
import { ExperimentTypeComponent } from './experiment-type/experiment-type.component';
import { ExperimentsActivate } from './experiments.activate';

const routes: Routes = [
  {
    path: 'list',
    component: ExperimentsComponent,
    pathMatch: 'full',
    data: {title: 'EXPERIMENTS.TITLE', buttonsAddon: ExperimentsButtonsAddonComponent}
  },
  {
    path: ':type',
    redirectTo: ':type/new'
  },
  {
    path: ':type/new',
    component: ExperimentTypeComponent,
    data: {title: 'EXPERIMENTS.TITLE_NEW'},
    canActivate: [ExperimentsActivate]
  },
  {
    path: ':type/:id',
    component: ExperimentTypeComponent,
    data: {title: 'EXPERIMENTS.TITLE_CONFIGURE', applyCustomNavColor: true},
    canActivate: [ExperimentsActivate]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
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
