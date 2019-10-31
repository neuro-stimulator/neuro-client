import { Component, OnInit } from '@angular/core';
import { AliveCheckerService, ConnectionStatus } from '../alive-checker.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  ConnectionStatus = ConnectionStatus;

  constructor(public readonly aliveChecker: AliveCheckerService) { }

  ngOnInit() {
  }

}
