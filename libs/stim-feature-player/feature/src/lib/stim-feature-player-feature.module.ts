import { NgModule } from '@angular/core';

import { TranslateModule } from "@ngx-translate/core";

import { StimLibUiModule } from "@diplomka-frontend/stim-lib-ui";
import { StimFeaturePlayerDomainModule } from "@diplomka-frontend/stim-feature-player/domain";
import { StimFeatureSettingsFeatureServiceStateModule } from "@diplomka-frontend/stim-feature-settings/feature/service-state";

import { PlayerComponent } from "./player.component";
import { PlayerPageToolsComponent } from "./player-page-tools/player-page-tools.component";
import { PlayerRoutingModule } from "./player-routing.module";

@NgModule({
  declarations: [
    PlayerComponent,
    PlayerPageToolsComponent
  ],
  imports: [
    StimLibUiModule,
    PlayerRoutingModule,
    StimFeatureSettingsFeatureServiceStateModule,
    TranslateModule,
    StimFeaturePlayerDomainModule
  ]
})
export class StimFeaturePlayerFeatureModule {}
