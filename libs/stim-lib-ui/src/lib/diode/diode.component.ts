import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'stim-lib-ui-diode',
  templateUrl: './diode.svg',
  styleUrls: ['./diode.component.sass']
})
export class DiodeComponent {
  @Input() id?: number;
  @Input() mainColor = '#ff1919';
  @Input() mainColorShine = '#ff6f6f';
  @Input() secondaryColor = '#910f0f';
  @Input() legsColor = '#8a8a8a';
  @Input() enabled = false;

  @Output() clicked = new EventEmitter<{ id?: number; enabled: boolean }>();

  handleClick() {
    this.enabled = !this.enabled;
    this.clicked.next({ id: this.id, enabled: this.enabled });
  }
}
