import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { TranslateModule } from "@ngx-translate/core";

import { ConsoleComponent } from "./console.component";

@NgModule({
  declarations: [
    ConsoleComponent
  ],
  imports: [
    // ConsoleRoutingModule,
    CommonModule,
    TranslateModule
  ],
  exports: [
    ConsoleComponent
  ]
})
export class StimFeatureSettingsFeatureConsoleModule {}
