import { NgModule } from '@angular/core';

import { PlayerComponent } from './player.component';
import { PlayerRoutingModule } from './player-routing.module';
import { PlayerPageToolsComponent } from './player-page-tools/player-page-tools.component';
import { SettingsModule } from '../settings/settings.module';
import { StimLibUiModule } from "@diplomka-frontend/stim-lib-ui";

@NgModule({
  declarations: [
    PlayerComponent,
    PlayerPageToolsComponent
  ],
  imports: [
    StimLibUiModule,
    PlayerRoutingModule,
    SettingsModule
  ]
})
export class PlayerModule {

}
