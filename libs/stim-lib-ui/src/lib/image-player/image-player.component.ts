import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { ModalComponent } from '@diplomka-frontend/stim-lib-modal';

@Component({
  selector: 'stim-lib-ui-image-player',
  templateUrl: './image-player.component.html',
  styleUrls: ['./image-player.component.sass'],
})
export class ImagePlayerComponent {
  @ViewChild('modal', { static: true }) modal: ModalComponent;

  @Input() title: string;
  @Input() displayTitle = true;

  @Output() requestFileChange: EventEmitter<void> = new EventEmitter<void>();

  private _imageUrl: string;

  get imageUrl() {
    return this._imageUrl;
  }

  @Input() set imageUrl(imageUrl: string) {
    this._imageUrl = imageUrl;
  }

  handleShowFileBrowser() {
    this.requestFileChange.emit(undefined);
  }
}
