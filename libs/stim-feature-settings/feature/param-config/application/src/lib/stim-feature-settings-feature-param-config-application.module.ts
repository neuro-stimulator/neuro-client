import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

import { StimLibUiModule } from '@neuro-client/stim-lib-ui';

import { ParamConfigApplicationComponent } from './param-config-application.component';

@NgModule({
  declarations: [
    ParamConfigApplicationComponent
  ],
  imports: [
    StimLibUiModule,
    TranslateModule
  ],
  exports: [
    ParamConfigApplicationComponent
  ]
})
export class StimFeatureSettingsFeatureParamConfigApplicationModule {}
