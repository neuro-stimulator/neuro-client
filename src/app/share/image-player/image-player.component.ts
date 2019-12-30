import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { FileRecord } from 'diplomka-share';

import { ModalComponent } from '../modal/modal.component';
import { FileBrowserComponent } from '../file-browser/file-browser.component';

@Component({
  selector: 'app-image-player',
  templateUrl: './image-player.component.html',
  styleUrls: ['./image-player.component.sass']
})
export class ImagePlayerComponent implements OnInit {

  @ViewChild('modal', {static: true}) modal: ModalComponent;

  @Input() title: string;
  @Input() displayTitle = true;

  @Output() fileChange: EventEmitter<FileRecord> = new EventEmitter<FileRecord>();

  private _imageUrl: string;

  constructor() { }

  ngOnInit() {}

  @Input() set imageUrl(audioUrl: string) {
    this._imageUrl = audioUrl;

  }

  get imageUrl() {
    return this._imageUrl;
  }

  handleShowFileBrowser() {
    this.modal.showComponent = FileBrowserComponent;
    this.modal.openForResult()
        .then((file: FileRecord) => {
          this.fileChange.next(file);
        })
        .catch(() => {
          // Dialog was closed
        });
  }
}
