import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { StimLibListUtilsModule } from "@diplomka-frontend/stim-lib-list-utils";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StimLibListUtilsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    StimLibListUtilsModule
  ]
})
export class StimLibCommonModule {}
