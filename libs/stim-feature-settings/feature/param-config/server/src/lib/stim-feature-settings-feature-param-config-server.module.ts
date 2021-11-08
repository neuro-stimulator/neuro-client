import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

import { StimLibUiModule } from '@neuro-client/stim-lib-ui';

import { ParamConfigServerComponent } from './param-config-server.component';

@NgModule({
  declarations: [
    ParamConfigServerComponent
  ],
  imports: [
    StimLibUiModule,
    TranslateModule
  ],
  exports: [
    ParamConfigServerComponent
  ]
})
export class StimFeatureSettingsFeatureParamConfigServerModule {}
