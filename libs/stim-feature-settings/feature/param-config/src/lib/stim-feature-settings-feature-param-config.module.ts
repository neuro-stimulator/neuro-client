import { NgModule } from '@angular/core';

import { StimLibUiModule } from "@diplomka-frontend/stim-lib-ui";

import { ParamConfigComponent } from "./param-config.component";
import { StimFeatureSettingsFeatureParamConfigApplicationModule } from "@diplomka-frontend/stim-feature-settings/feature/param-config/application";
import { StimFeatureSettingsFeatureParamConfigExperimentsModule } from "@diplomka-frontend/stim-feature-settings/feature/param-config/experiments";
import { StimFeatureSettingsFeatureParamConfigServerModule } from "@diplomka-frontend/stim-feature-settings/feature/param-config/server";

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
