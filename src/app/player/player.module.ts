import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerComponent } from './player.component';
import { PlayerRoutingModule } from './player-routing.module';
import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
  declarations: [
    PlayerComponent
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    Ng5SliderModule
  ]
})
export class PlayerModule {

}
