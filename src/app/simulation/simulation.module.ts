import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from '../share/share.module';
import { SimulationRoutingModule } from './simulation-routing.module';

import { SimulationComponent } from './simulation.component';
import { SimulationTypeErpComponent } from './simulation-type/simulation-type-erp/simulation-type-erp.component';

@NgModule({
  declarations: [
    SimulationComponent,
    SimulationTypeErpComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    SimulationRoutingModule
  ],
  entryComponents: [
    SimulationTypeErpComponent
  ]
})
export class SimulationModule {

}
