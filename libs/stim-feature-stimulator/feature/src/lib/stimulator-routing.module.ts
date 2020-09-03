import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StimulatorComponent } from './stimulator.component';
import { CalibrationComponent } from './calibration/calibration.component';

const routes: Routes = [
  {
    path: '',
    component: StimulatorComponent,
    data: { title: 'STIMULATOR.TITLE' },
  },
  {
    path: 'calibration',
    component: CalibrationComponent,
    data: { title: 'STIMULATOR.CALIBRATION.TITLE' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StimulatorRoutingModule {}
