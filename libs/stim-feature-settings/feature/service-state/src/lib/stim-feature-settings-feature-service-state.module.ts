import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { TranslateModule } from "@ngx-translate/core";

import { StimFeatureStimulatorDomainModule } from "@diplomka-frontend/stim-feature-stimulator/domain";
import { StimLibConnectionModule } from "@diplomka-frontend/stim-lib-connection";

import { ServiceStateComponent } from "./service-state.component";
// import { ServiceStateRoutingModule } from "./service-state-routing.module";

@NgModule({
  declarations: [
    ServiceStateComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    // ServiceStateRoutingModule,
    StimFeatureStimulatorDomainModule,
    StimLibConnectionModule
  ],
  exports: [
    ServiceStateComponent
  ]
})
export class StimFeatureSettingsFeatureServiceStateModule {}
