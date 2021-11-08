import { Component, OnDestroy, OnInit } from '@angular/core';

import { StimulatorFacade } from '@neuro-client/stim-feature-stimulator/domain';

@Component({
  templateUrl: './calibration.component.html',
  styleUrls: ['./calibration.component.sass'],
})
export class CalibrationComponent implements OnInit, OnDestroy {
  // @ViewChild('diode1', { static: true }) diode1: DiodeComponent;
  // @ViewChild('diode2', { static: true }) diode2: DiodeComponent;
  // @ViewChild('diode3', { static: true }) diode3: DiodeComponent;
  // @ViewChild('diode4', { static: true }) diode4: DiodeComponent;
  // @ViewChild('diode5', { static: true }) diode5: DiodeComponent;
  // @ViewChild('diode6', { static: true }) diode6: DiodeComponent;
  // @ViewChild('diode7', { static: true }) diode7: DiodeComponent;
  // @ViewChild('diode8', { static: true }) diode8: DiodeComponent;
  //
  // private _diodes: DiodeComponent[] = [];

  constructor(private readonly facade: StimulatorFacade) {}

  ngOnInit(): void {
    // this._diodes.splice(0);
    // this._diodes.push(
    //   this.diode1,
    //   this.diode2,
    //   this.diode3,
    //   this.diode4,
    //   this.diode5,
    //   this.diode6,
    //   this.diode7,
    //   this.diode8
    // );
  }

  ngOnDestroy(): void {
    // this._diodes.splice(0);
  }

  handleDiodeClick(data: { id?: number; enabled: boolean }) {
    this.facade.setOutput(data.id, data.enabled);
  }
}
