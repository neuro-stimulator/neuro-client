import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioPlayerComponent } from './audio-player.component';

@NgModule({
  declarations: [
    AudioPlayerComponent
  ],
  exports: [
    AudioPlayerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AudioPlayerModule {

}
