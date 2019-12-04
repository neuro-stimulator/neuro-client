import { Component, OnInit } from '@angular/core';
import { CommandsService } from '../share/commands.service';
import { SerialService } from '../share/serial.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent implements OnInit {

  private _experimentID: number;

  constructor(private readonly _command: CommandsService,
              private readonly _serial: SerialService,
              private readonly _router: Router,
              private readonly _route: ActivatedRoute) { }

  ngOnInit() {
    if (this._route.snapshot.params['type'] === undefined ||
        this._route.snapshot.params['id'] === undefined) {
      this._router.navigate(['/experiments']);
    }

    // const type = this._route.snapshot.params['type'];
    this._experimentID = this._route.snapshot.params['id'];
  }

  handleUploadExperiment() {
    this._command.experimentSetup(this._experimentID);
  }

  handleRunExperiment() {
    this._command.experimentStart();
  }

  handleStopExperiment() {
    this._command.experimentStop();
  }

  handleClearExperiment() {
    this._command.experimentClear();
  }

  get stimulatorOnline(): boolean {
    return this._serial.isSerialConnected;
  }
}
