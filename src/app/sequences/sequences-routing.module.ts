import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SequenceComponent } from './sequence/sequence.component';
import { SequencesComponent } from './sequences.component';

const routes: Routes = [
  {
    path: '',
    component: SequencesComponent,
    data: {title: 'Sekvence'}
  },
  {
    path: 'new',
    component: SequenceComponent,
    data: {title: 'Nová sekvence'}
  },
  {
    path: ':id',
    component: SequenceComponent,
    data: {title: 'Sekvence'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SequencesRoutingModule {

}
