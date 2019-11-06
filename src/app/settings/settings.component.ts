import { Component, OnInit } from '@angular/core';
import { AliveCheckerService, ConnectionStatus } from '../alive-checker.service';
import { SerialService } from '../share/serial.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  ConnectionStatus = ConnectionStatus;
  console = '';
  command = '';

  constructor(public readonly aliveChecker: AliveCheckerService,
              private readonly _gateway: SerialService) { }

  ngOnInit() {
    this._gateway.rawData$.subscribe(data => {
      this.console += JSON.stringify(data);
      this.console += '\n';
    });
  }

  handleSendCommand() {

  }
}
