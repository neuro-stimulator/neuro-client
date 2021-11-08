import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { StimLibModalModule } from '@neuro-client/stim-lib-modal';
import { StimLibConnectionModule } from '@neuro-client/stim-lib-connection';
import { StimFeatureStimulatorDomainModule } from '@neuro-client/stim-feature-stimulator/domain';
import { StimFeatureFileBrowserFeatureModule } from '@neuro-client/stim-feature-file-browser/feature';

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
