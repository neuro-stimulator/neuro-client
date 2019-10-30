import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from '../share/modal/modal.module';
import { ExperimentsRoutingModule } from './experiments-routing.module';

import { ExperimentsComponent } from './experiments.component';
import { ExperimentItemListComponent } from './experiment-item/experiment-item-list.component';
import { ExperimentGhostItemListComponent } from './experiment-ghost-item/experiment-ghost-item-list.component';
import { ExperimentTypeResolverDirective } from './experiment-type/experiment-type-resolver.directive';
import { ExperimentTypeComponent } from './experiment-type/experiment-type.component';
import { ExperimentTypeErpComponent } from './experiment-type/experiment-type-erp/experiment-type-erp.component';
import { ExperimentTypeNoneComponent } from './experiment-type/experiment-type-none/experiment-type-none.component';
import { ExperimentTypeCvepComponent } from './experiment-type/experiment-type-cvep/experiment-type-cvep.component';
import { ExperimentTypeFvepComponent } from './experiment-type/experiment-type-fvep/experiment-type-fvep.component';
import { ExperimentTypeTvepComponent } from './experiment-type/experiment-type-tvep/experiment-type-tvep.component';
import { ExperimentTypeReaComponent } from './experiment-type/experiment-type-rea/experiment-type-rea.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { FabModule } from '../share/fab/fab.module';
import { ExperimentTypeHeaderComponent } from './experiment-type/experiment-type-header/experiment-type-header.component';

@NgModule({
  declarations: [
    ExperimentsComponent,
    ExperimentItemListComponent,
    ExperimentGhostItemListComponent,
    ExperimentTypeResolverDirective,
    ExperimentTypeComponent,
    ExperimentTypeErpComponent,
    ExperimentTypeNoneComponent,
    ExperimentTypeCvepComponent,
    ExperimentTypeFvepComponent,
    ExperimentTypeTvepComponent,
    ExperimentTypeReaComponent,
    ExperimentTypeHeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Ng5SliderModule,
    ModalModule,
    ExperimentsRoutingModule,
    FabModule
  ],
  entryComponents: [
    ExperimentTypeNoneComponent,
    ExperimentTypeErpComponent,
    ExperimentTypeCvepComponent,
    ExperimentTypeFvepComponent,
    ExperimentTypeTvepComponent,
    ExperimentTypeReaComponent
  ]
})
export class ExperimentsModule {

}
