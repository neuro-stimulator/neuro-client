import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-output-type',
  templateUrl: './output-type.component.html',
  styleUrls: ['./output-type.component.sass']
})
export class OutputTypeComponent implements OnInit {

  @Input() form: FormGroup;

  uuid = `${Math.random()}`;

  constructor() {}

  ngOnInit() {}

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

  get led() {
    return this.form.get('led');
  }

  get audio() {
    return this.form.get('audio');
  }

  get image() {
    return this.form.get('image');
  }
}
