import { Component, OnInit } from '@angular/core';

import { AliveCheckerService} from '../alive-checker.service';
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

  constructor(public readonly aliveChecker: AliveCheckerService,
              private readonly _gateway: SerialService,
              private readonly _service: SettingsService) { }

  ngOnInit() {
    this._gateway.rawData$.subscribe(data => {
      this.console = JSON.stringify(data);
    });
  }

  handleSendCommand() {

  }

  async handleDiscover() {
    await this._service.discover();
  }

  async handleStop() {
    await this._service.stop();
  }
}
