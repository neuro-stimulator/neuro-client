import { NgModule } from '@angular/core';

import { TranslateModule } from "@ngx-translate/core";

import { ConsoleComponent } from "./console.component";
import { ConsoleRoutingModule } from "./console-routing.module";

@NgModule({
  declarations: [
    ConsoleComponent
  ],
  imports: [
    ConsoleRoutingModule,
    TranslateModule
  ],
  exports: [
    ConsoleComponent
  ]
})
export class StimFeatureSettingsFeatureConsoleModule {}
