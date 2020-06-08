import { NgModule } from '@angular/core';

import { TranslateModule } from "@ngx-translate/core";

import { StimFeatureSettingsDomainModule } from "@diplomka-frontend/stim-feature-settings/domain";

import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings.component";

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    TranslateModule,
    // CommonModule,
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
    StimFeatureSettingsDomainModule,
    SettingsRoutingModule,
    // StimLibUiModule
  ]
})
export class StimFeatureSettingsFeatureModule {}
