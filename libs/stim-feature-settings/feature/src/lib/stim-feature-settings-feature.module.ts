import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { StimFeatureSettingsDomainModule } from '@diplomka-frontend/stim-feature-settings/domain';
import { StimFeatureSettingsFeatureServiceStateModule } from '@diplomka-frontend/stim-feature-settings/feature/service-state';
import { StimFeatureStimulatorDomainModule } from '@diplomka-frontend/stim-feature-stimulator/domain';
import { StimLibConnectionModule } from '@diplomka-frontend/stim-lib-connection';
import { StimFeatureSettingsFeatureParamConfigModule } from '@diplomka-frontend/stim-feature-settings/feature/param-config';
import { StimLibConsoleFeatureModule } from '@diplomka-frontend/stim-lib-console/feature';

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
