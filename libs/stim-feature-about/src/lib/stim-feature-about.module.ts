import { NgModule } from '@angular/core';

import { TranslateModule } from "@ngx-translate/core";

import { AboutComponent } from "./about.component";
import { AboutRoutingModule } from "./about-routing.module";

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    AboutRoutingModule,
    TranslateModule
  ]
})
export class StimFeatureAboutModule {}
