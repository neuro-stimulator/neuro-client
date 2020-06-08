import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListButtonsAddonComponent } from "@diplomka-frontend/stim-lib-ui";

import { SequenceComponent } from './sequence/sequence.component';
import { SequencesComponent } from './sequences.component';

const routes: Routes = [
  {
    path: 'list',
    component: SequencesComponent,
    data: {
      title: 'SEQUENCES.TITLE',
      buttonsAddon: ListButtonsAddonComponent,
    }
  },
  {
    path: 'new',
    component: SequenceComponent,
    data: {title: 'SEQUENCES.TITLE_NEW'}
  },
  {
    path: ':id',
    component: SequenceComponent,
    data: {title: 'SEQUENCES.TITLE_CONFIGURE'}
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
export class SequencesRoutingModule {

}
