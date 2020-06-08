import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from '@angular/forms';

import { FileRecord } from '@stechy1/diplomka-share';

import { ModalComponent } from "@diplomka-frontend/stim-lib-modal";
import { FileBrowserComponent } from "@diplomka-frontend/stim-feature-file-browser/feature";

@Component({
  selector: 'stim-feature-experiments-output-type',
  templateUrl: './output-type.component.html',
  styleUrls: ['./output-type.component.sass']
})
export class OutputTypeComponent implements OnInit {

  @ViewChild('modal', {static: true}) modal: ModalComponent;

  @Input() form: FormGroup;

  uuid = `${Math.random()}`;
  audioUrl: string;
  imageUrl: string;

  defaultTitle = 'Vyberte soubor...';

  constructor() {}

  ngOnInit() {
    this.audioUrl = this.buildFilePath(this.audioFile.value);
    this.imageUrl = this.buildFilePath(this.imageFile.value);
  }

  buildFilePath(path: string) {
    // TODO vyřešit originální cestu k obázku
    return '';
    // return `${FileBrowserService.BASE_API_URL}/${path}`;
  }

  handleLedChange(event: Event) {
    if (((event.target) as HTMLInputElement).checked) {
      this.audio.setValue(false);
      this.image.setValue(false);
    }
  }

  handleAudioImageChange(event: Event) {
    if (((event.target) as HTMLInputElement).checked) {
      this.led.setValue(false);
    }
  }

  handleRequestAudioChange() {
      this.modal.showComponent = FileBrowserComponent;
      this.modal.openForResult()
          .then((fileRecord: FileRecord) => {
            this.audioFile.setValue(fileRecord.path);
            this.audioUrl = this.buildFilePath(fileRecord.path);
          })
          .catch((e) => {
            // Dialog was closed
            console.log(e);
          });
  }

  handleRequestImageChange() {
    this.modal.showComponent = FileBrowserComponent;
    this.modal.openForResult()
        .then((fileRecord: FileRecord) => {
          this.imageFile.setValue(fileRecord.path);
          this.imageUrl = this.buildFilePath(fileRecord.path);
        })
        .catch(() => {
          // Dialog was closed
        });
  }

  get led() {
    return this.form.get('led');
  }

  get audio() {
    return this.form.get('audio');
  }

  get audioFile() {
    return this.form.get('audioFile');
  }

  get image() {
    return this.form.get('image');
  }

  get imageFile() {
    return this.form.get('imageFile');
  }
}
