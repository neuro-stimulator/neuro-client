import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FileRecord } from '@stechy1/diplomka-share';

import { FileBrowserService } from '../../../share/file-browser/file-browser.service';

@Component({
  selector: 'app-output-type',
  templateUrl: './output-type.component.html',
  styleUrls: ['./output-type.component.sass']
})
export class OutputTypeComponent implements OnInit {

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
    return `${FileBrowserService.BASE_API_URL}/${path}`;
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

  handleAudioSelected(fileRecord: FileRecord) {
    this.audioFile.setValue(fileRecord.path);
    this.audioUrl = this.buildFilePath(fileRecord.path);
  }

  handleImageSelected(fileRecord: FileRecord) {
    this.imageFile.setValue(fileRecord.path);
    this.imageUrl = this.buildFilePath(fileRecord.path);
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
