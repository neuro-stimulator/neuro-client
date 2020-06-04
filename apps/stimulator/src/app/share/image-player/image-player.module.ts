import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from '@diplomka-frontend/stim-lib-modal';

import { FileBrowserModule } from '../file-browser/file-browser.module';
import { ImagePlayerComponent } from './image-player.component';

@NgModule({
  declarations: [
    ImagePlayerComponent
  ],
  exports: [
    ImagePlayerComponent
  ],
  imports: [
    CommonModule,
    ModalModule,
    FileBrowserModule
  ]
})
export class ImagePlayerModule {

}
