import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { ModalComponent } from "@neuro-client/stim-lib-modal";

@Component({
  selector: 'stim-lib-ui-matrix-player',
  templateUrl: './matrix-player.component.html',
  styleUrls: ['./matrix-player.component.sass'],
})
export class MatrixPlayerComponent {

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