import { NgModule } from '@angular/core';

import { StimLibUiModule } from '@neuro-client/stim-lib-ui';
import { StimLibCommonModule } from '@neuro-client/stim-lib-common';

import { StimulatorComponent } from './stimulator.component';
import { CalibrationComponent } from './calibration/calibration.component';
import { StimulatorRoutingModule } from './stimulator-routing.module';

@NgModule({
  declarations: [StimulatorComponent, CalibrationComponent],
  imports: [StimLibCommonModule, StimLibUiModule, StimulatorRoutingModule],
})
export class StimFeatureStimulatorFeatureModule {}
