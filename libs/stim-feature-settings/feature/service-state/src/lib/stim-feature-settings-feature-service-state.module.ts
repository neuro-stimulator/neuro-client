import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { StimLibModalModule } from '@diplomka-frontend/stim-lib-modal';
import { StimLibConnectionModule } from '@diplomka-frontend/stim-lib-connection';
import { StimFeatureStimulatorDomainModule } from '@diplomka-frontend/stim-feature-stimulator/domain';
import { StimFeatureFileBrowserFeatureModule } from '@diplomka-frontend/stim-feature-file-browser/feature';

import { ServiceStateComponent } from './service-state.component';

@NgModule({
  declarations: [ServiceStateComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ReactiveFormsModule,
    StimLibModalModule,
    StimFeatureStimulatorDomainModule,
    StimFeatureFileBrowserFeatureModule,
    StimLibConnectionModule,
  ],
  exports: [ServiceStateComponent],
})
export class StimFeatureSettingsFeatureServiceStateModule {}
