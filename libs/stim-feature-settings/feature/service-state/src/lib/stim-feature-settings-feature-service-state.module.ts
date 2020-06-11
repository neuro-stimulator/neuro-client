import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { TranslateModule } from "@ngx-translate/core";

import { ServiceStateComponent } from "./service-state.component";
import { ServiceStateRoutingModule } from "./service-state-routing.module";

@NgModule({
  declarations: [
    ServiceStateComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    ServiceStateRoutingModule
  ],
  exports: [
    ServiceStateComponent
  ]
})
export class StimFeatureSettingsFeatureServiceStateModule {}
