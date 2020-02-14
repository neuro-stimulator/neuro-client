import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SequenceComponent } from './sequence/sequence.component';
import { SequencesComponent } from './sequences.component';

const routes: Routes = [
  {
    path: '',
    component: SequencesComponent,
    data: {title: 'SEQUENCES.TITLE'}
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SequencesRoutingModule {

}
