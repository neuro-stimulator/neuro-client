import { Component, OnInit } from '@angular/core';

import { AliveCheckerService } from '../alive-checker.service';
import { SerialService } from '../share/serial.service';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  console = '';
  command = '';

  devices = [];

  constructor(public readonly aliveChecker: AliveCheckerService,
              private readonly _gateway: SerialService,
              private readonly _service: SettingsService) {
  }

  ngOnInit() {
    this._gateway.rawData$.subscribe(data => {
      this.console = JSON.stringify(data);
    });
  }

  handleSendCommand() {

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

  get serialConnected() {
    return this._gateway.isSerialConnected;
  }
}
