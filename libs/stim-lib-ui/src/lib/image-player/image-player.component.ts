import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { ModalComponent } from '@diplomka-frontend/stim-lib-modal';

@Component({
  selector: 'stim-lib-ui-image-player',
  templateUrl: './image-player.component.html',
  styleUrls: ['./image-player.component.sass'],
})
export class ImagePlayerComponent implements OnInit {
  @ViewChild('modal', { static: true }) modal: ModalComponent;

  @Input() title: string;
  @Input() displayTitle = true;

  @Output() requestFileChange: EventEmitter<void> = new EventEmitter<void>();

  private _imageUrl: string;

  constructor() {}

  ngOnInit() {}

  @Input() set imageUrl(imageUrl: string) {
    this._imageUrl = imageUrl;
  }

  get imageUrl() {
    return this._imageUrl;
  }

  handleShowFileBrowser() {
    this.requestFileChange.next();
  }
}
