import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from '../share/modal/modal.module';
import { ExperimentsRoutingModule } from './experiments-routing.module';

import { ExperimentsComponent } from './experiments.component';
import { ExperimentItemListComponent } from './experiment-item/experiment-item-list.component';
import { ExperimentGhostItemListComponent } from './experiment-ghost-item/experiment-ghost-item-list.component';
import { ExperimentTypeComponent } from './experiment-type/experiment-type.component';

@NgModule({
  declarations: [
    ExperimentsComponent,
    ExperimentItemListComponent,
    ExperimentGhostItemListComponent,
    ExperimentTypeComponent
  ],
  imports: [
    CommonModule,
    ModalModule,
    ExperimentsRoutingModule
  ]
})
export class ExperimentsModule {

}
