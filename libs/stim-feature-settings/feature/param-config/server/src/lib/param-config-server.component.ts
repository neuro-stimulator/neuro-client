import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'stim-feature-settings-param-config-server',
  templateUrl: './param-config-server.component.html',
  styleUrls: ['./param-config-server.component.sass']
})
export class ParamConfigServerComponent implements OnInit {

  public readonly baudrates = [ 115200, 57600, 38400, 19200, 9600, 4800, 2400, 1800, 1200, 600, 300, 200, 150, 134, 110, 75, 50 ];
  public readonly dataBits = [ 8, 7, 6, 5 ];
  public readonly stopBits = [ 1, 2 ];
  public readonly paritys = [ 'none', 'even', 'mark', 'odd', 'space' ];

  @Input() form: FormGroup;

  public static createForm(): FormGroup {
    return new FormGroup({
      autoconnectToStimulator: new FormControl(),
      serial: new FormGroup({
        baudRate: new FormControl(null, Validators.required),
        dataBits: new FormControl(null),
        stopBits: new FormControl(null),
        parity: new FormControl(null)
      }),
      stimulatorResponseTimeout: new FormControl(null, Validators.min(500))
    });
  }

  constructor() { }

  ngOnInit() {
  }

  get stimulatorResponseTimeout() {
    return this.form.get('stimulatorResponseTimeout');
  }

}
