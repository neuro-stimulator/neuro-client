import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { StimFeatureSettingsDomainModule } from '@neuro-client/stim-feature-settings/domain';
import { StimFeatureSettingsFeatureServiceStateModule } from '@neuro-client/stim-feature-settings/feature/service-state';
import { StimFeatureStimulatorDomainModule } from '@neuro-client/stim-feature-stimulator/domain';
import { StimLibConnectionModule } from '@neuro-client/stim-lib-connection';
import { StimFeatureSettingsFeatureParamConfigModule } from '@neuro-client/stim-feature-settings/feature/param-config';
import { StimLibConsoleFeatureModule } from '@neuro-client/stim-lib-console/feature';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    TranslateModule,
    CommonModule,

    StimLibConnectionModule,
    StimFeatureStimulatorDomainModule,
    StimFeatureSettingsDomainModule,
    StimFeatureSettingsFeatureParamConfigModule,
    StimFeatureSettingsFeatureServiceStateModule,
    StimLibConsoleFeatureModule,
    SettingsRoutingModule,
  ],
})
export class StimFeatureSettingsFeatureModule {}
