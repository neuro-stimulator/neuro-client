import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerComponent } from './player.component';
import { PlayerRoutingModule } from './player-routing.module';
import { Ng5SliderModule } from 'ng5-slider';
import { ExperimentViewerModule } from '../share/experiment-viewer/experiment-viewer.module';
import { TranslateModule } from '@ngx-translate/core';
import { PlayerPageToolsComponent } from './player-page-tools/player-page-tools.component';
import { SettingsModule } from '../settings/settings.module';

@NgModule({
  declarations: [
    PlayerComponent,
    PlayerPageToolsComponent
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    Ng5SliderModule,
    ExperimentViewerModule,
    TranslateModule,
    SettingsModule
  ]
})
export class PlayerModule {

}
