import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AliveCheckerService } from '../../alive-checker.service';
import { SerialService } from '../../share/serial.service';

@Component({
  selector: 'app-service-state',
  templateUrl: './service-state.component.html',
  styleUrls: ['./service-state.component.sass']
})
export class ServiceStateComponent implements OnInit {

  devices = [];
  firmwareForm = new FormGroup({
    text: new FormControl(null),
    firmware: new FormControl(null, [Validators.required])
  });

  constructor(public readonly aliveChecker: AliveCheckerService,
              private readonly _gateway: SerialService) { }

  ngOnInit() {
  }

  async handleDiscover() {
    this.devices = await this._gateway.discover();
  }

  async handleOpen(path: string) {
    await this._gateway.open(path);
  }

  async handleStop() {
    await this._gateway.stop();
  }

  handleFileSelect(event: Event) {
    const input = (event.target as HTMLInputElement);

    // // Vytvořím novou instanci třídy pro přečtení souboru
    // const reader = new FileReader();
    // const self = this;
    // // Nastavím payload, který se zavolá po přečtení souboru
    // reader.onload = () => {
    //   self.firmwareForm.setValue({firmware: reader.result, text: input.files[0].name});
    // };
    // reader.readAsDataURL(input.files[0]);
    this.firmwareForm.setValue({firmware: input.files[0], text: input.files[0].name});
  }

  handleUpdateStimulatorFirmware() {
    this._gateway.updateFirmware(this.firmwareForm.get('firmware').value);
  }

  get serialConnected() {
    return this._gateway.isSerialConnected;
  }

  get firmwareFilePath() {
    return this.firmwareForm.get('text').value;
  }
}
