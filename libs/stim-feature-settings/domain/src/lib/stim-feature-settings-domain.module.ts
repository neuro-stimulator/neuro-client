import { NgModule } from "@angular/core";

import { StimLibCommonModule } from "@diplomka-frontend/stim-lib-common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import * as fromSettings from './store/settings.reducer';
import { SettingsEffects } from "./store/settings.effects";
import { SettingsFacade } from "./application-services/settings.facade";
import { ConsoleFacade } from "./application-services/console.facade";
import { LocalSettingsResolver } from "./application-services/local-settings.resolver";
import { ServerSettingsResolver } from "./application-services/server-settings.resolver";
import { StimFeatureStimulatorDomainModule } from "@diplomka-frontend/stim-feature-stimulator/domain";

@NgModule({
  imports: [
    StimLibCommonModule,
    StoreModule.forFeature(fromSettings.settingsReducerKey, fromSettings.settingsReducer),
    EffectsModule.forFeature([SettingsEffects]),
    StimFeatureStimulatorDomainModule
  ],
  providers: [
    SettingsFacade,
    ConsoleFacade,
    LocalSettingsResolver,
    ServerSettingsResolver
  ]
})
export class StimFeatureSettingsDomainModule {
  // static forRoot(): ModuleWithProviders {
  //   return {
  //     ngModule: StimFeatureSettingsDomainModule,
  //     providers: [
  //       SettingsFacade,
  //       ConsoleFacade,
  //     ]
  //   };
  // }
}
