import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from '../share/modal/modal.module';
import { ExperimentsRoutingModule } from './experiments-routing.module';

import { ExperimentsComponent } from './experiments.component';
import { ExperimentItemListComponent } from './experiment-item/experiment-item-list.component';
import { ExperimentGhostItemListComponent } from './experiment-ghost-item/experiment-ghost-item-list.component';
import { ExperimentTypeComponent } from './experiment-type/experiment-type.component';
import { ExperimentTypeErpComponent } from './experiment-type/experiment-type-erp/experiment-type-erp.component';
import { ExperimentTypeResolverDirective } from './experiment-type/experiment-type-resolver.directive';
import { ExperimentTypeNoneComponent } from './experiment-type/experiment-type-none/experiment-type-none.component';

@NgModule({
  declarations: [
    ExperimentTypeResolverDirective,
    ExperimentsComponent,
    ExperimentItemListComponent,
    ExperimentGhostItemListComponent,
    ExperimentTypeComponent,
    ExperimentTypeErpComponent,
    ExperimentTypeNoneComponent
  ],
  imports: [
    CommonModule,
    ModalModule,
    ExperimentsRoutingModule
  ],
  entryComponents: [
    ExperimentTypeNoneComponent,
    ExperimentTypeErpComponent
  ]
})
export class ExperimentsModule {

}
