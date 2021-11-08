import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FileRecord } from '@stechy1/diplomka-share';

import { ModalComponent } from '@neuro-client/stim-lib-modal';
import { FileBrowserComponent } from '@neuro-client/stim-feature-file-browser/feature';
import { TOKEN_FILE_BROWSER_API_URL } from '@neuro-client/stim-lib-common';

@Component({
  selector: 'stim-feature-experiments-output-type',
  templateUrl: './output-type.component.html',
  styleUrls: ['./output-type.component.sass'],
})
export class OutputTypeComponent implements OnInit {
  @ViewChild('modal', { static: true }) modal: ModalComponent;

  @Input() form: FormGroup;

  uuid = `${Math.random()}`;
  audioUrl: string;
  imageUrl: string;

  defaultTitle = 'Vyberte soubor...';

  constructor(@Inject(TOKEN_FILE_BROWSER_API_URL) private readonly filesBaseUrl) {}

  ngOnInit() {
    this.audioFile.valueChanges.subscribe((value) => {
      this.audioUrl = this.buildFilePath(value);
    });
    this.imageFile.valueChanges.subscribe((value) => {
      this.imageUrl = this.buildFilePath(value);
    });
  }

  buildFilePath(path: string) {
    return `${this.filesBaseUrl}/${path}`;
  }

  handleLedChange(event: Event) {
    if ((event.target as HTMLInputElement).checked) {
      this.audio.setValue(false);
      this.image.setValue(false);
    }
  }

  handleAudioImageChange(event: Event) {
    if ((event.target as HTMLInputElement).checked) {
      this.led.setValue(false);
    }
  }

  handleRequestAudioChange() {
    this.modal.showComponent = FileBrowserComponent;
    this.modal
      .openForResult<void, FileRecord>()
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
    this.modal
      .openForResult<void, FileRecord>()
      .then((fileRecord: FileRecord) => {
        this.imageFile.setValue(fileRecord.path);
        this.imageFile.parent.parent.get('width').setValue(fileRecord.width);
        this.imageFile.parent.parent.get('height').setValue(fileRecord.height);
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
