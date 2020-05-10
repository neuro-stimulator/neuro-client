import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListButtonsAddonComponent } from '../share/list-buttons-addon/list-buttons-addon.component';
import { ExperimentsComponent } from './experiments.component';
import { ExperimentTypeComponent } from './experiment-type/experiment-type.component';
import { ExperimentsActivate } from './experiments.activate';
import { ExperimentsPageToolsComponent } from './experiments-page-tools/experiments-page-tools.component';
import { ExperimentsDeactivate } from './experiments.deactivate';

const routes: Routes = [
  {
    path: 'list',
    component: ExperimentsComponent,
    pathMatch: 'full',
    data: {
      title: 'EXPERIMENTS.TITLE',
      buttonsAddon: ListButtonsAddonComponent,
      pageToolsComponent: ExperimentsPageToolsComponent
    }
  },
  {
    path: ':type',
    redirectTo: ':type/new'
  },
  {
    path: ':type/new',
    component: ExperimentTypeComponent,
    data: {
      title: 'EXPERIMENTS.TITLE_NEW'
    },
    canActivate: [ExperimentsActivate]
  },
  {
    path: ':type/:id',
    component: ExperimentTypeComponent,
    data: {
      title: 'EXPERIMENTS.TITLE_CONFIGURE',
      applyCustomNavColor: true
    },
    canActivate: [ExperimentsActivate],
    // canDeactivate: [ExperimentsDeactivate]
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
