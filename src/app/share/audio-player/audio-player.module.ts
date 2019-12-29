import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from '../modal/modal.module';
import { FileBrowserModule } from '../file-browser/file-browser.module';

import { AudioPlayerComponent } from './audio-player.component';

@NgModule({
  declarations: [
    AudioPlayerComponent
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
