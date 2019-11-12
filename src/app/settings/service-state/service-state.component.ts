import { Component, OnInit } from '@angular/core';
import { SerialService } from '../../share/serial.service';
import { AliveCheckerService } from '../../alive-checker.service';

@Component({
  selector: 'app-service-state',
  templateUrl: './service-state.component.html',
  styleUrls: ['./service-state.component.sass']
})
export class ServiceStateComponent implements OnInit {

  devices = [];

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

  get serialConnected() {
    return this._gateway.isSerialConnected;
  }

}
