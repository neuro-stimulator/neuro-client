import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from '../modal/modal.module';
import { FileBrowserModule } from '../file-browser/file-browser.module';

import { AudioPlayerComponent } from './audio-player.component';
import { SecondsToMinutesPipe } from './seconds-to-minutes.pipe';
import { AudioTitlePipe } from './audio-title.pipe';

@NgModule({
  declarations: [
    AudioPlayerComponent,
    SecondsToMinutesPipe,
    AudioTitlePipe
  ],
  exports: [
    AudioPlayerComponent
  ],
  imports: [
    CommonModule,
    ModalModule,
    FileBrowserModule
  ]
})
export class AudioPlayerModule {

}
