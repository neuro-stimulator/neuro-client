import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { TranslateModule } from "@ngx-translate/core";

import { StimFeatureSettingsDomainModule } from "@diplomka-frontend/stim-feature-settings/domain";

import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings.component";
import { StimFeatureSettingsFeatureServiceStateModule } from "@diplomka-frontend/stim-feature-settings/feature/service-state";
import { StimFeatureSettingsFeatureConsoleModule } from "@diplomka-frontend/stim-feature-settings/feature/console";
import { StimFeatureStimulatorDomainModule } from "@diplomka-frontend/stim-feature-stimulator/domain";
import { StimLibConnectionModule } from "@diplomka-frontend/stim-lib-connection";
import { StimFeatureSettingsFeatureParamConfigModule } from "@diplomka-frontend/stim-feature-settings/feature/param-config";

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    TranslateModule,
    CommonModule,
    // ReactiveFormsModule,
    //
    // TranslateModule.forChild({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: createTranslateLoader,
    //     deps: [HttpClient]
    //   }
    // }),
    //
    StimLibConnectionModule,
    StimFeatureStimulatorDomainModule,
    StimFeatureSettingsDomainModule,
    StimFeatureSettingsFeatureParamConfigModule,
    StimFeatureSettingsFeatureServiceStateModule,
    StimFeatureSettingsFeatureConsoleModule,
    SettingsRoutingModule,
  ]
})
export class StimFeatureSettingsFeatureModule {}
