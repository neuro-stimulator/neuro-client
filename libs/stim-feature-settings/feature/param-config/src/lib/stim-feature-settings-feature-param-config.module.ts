import { NgModule } from '@angular/core';

import { StimLibUiModule } from '@neuro-client/stim-lib-ui';

import { ParamConfigComponent } from './param-config.component';
import { StimFeatureSettingsFeatureParamConfigApplicationModule } from '@neuro-client/stim-feature-settings/feature/param-config/application';
import { StimFeatureSettingsFeatureParamConfigExperimentsModule } from '@neuro-client/stim-feature-settings/feature/param-config/experiments';
import { StimFeatureSettingsFeatureParamConfigServerModule } from '@neuro-client/stim-feature-settings/feature/param-config/server';

@NgModule({
  declarations: [
    ParamConfigComponent,
  ],
  imports: [
    StimLibUiModule,
    StimFeatureSettingsFeatureParamConfigApplicationModule,
    StimFeatureSettingsFeatureParamConfigExperimentsModule,
    StimFeatureSettingsFeatureParamConfigServerModule,
  ],
  exports: [
    ParamConfigComponent
  ]
})
export class StimFeatureSettingsFeatureParamConfigModule {}
