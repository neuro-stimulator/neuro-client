import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

import { StimLibUiModule } from '@neuro-client/stim-lib-ui';

import { ParamConfigExperimentsComponent } from './param-config-experiments.component';

@NgModule({
  declarations: [
    ParamConfigExperimentsComponent
  ],
  imports: [
    StimLibUiModule,
    TranslateModule
  ],
  exports: [
    ParamConfigExperimentsComponent
  ]
})
export class StimFeatureSettingsFeatureParamConfigExperimentsModule {}
