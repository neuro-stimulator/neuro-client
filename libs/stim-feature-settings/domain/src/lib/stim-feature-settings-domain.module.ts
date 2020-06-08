import { ModuleWithProviders, NgModule } from "@angular/core";

import { StimLibCommonModule } from "@diplomka-frontend/stim-lib-common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import * as fromSettings from './store/settings.reducer';
import { SettingsEffects } from "./store/settings.effects";
import { SettingsFacade } from "./application-services/settings.facade";
import { ConsoleFacade } from "./application-services/console.facade";

@NgModule({
  imports: [
    StimLibCommonModule,
    StoreModule.forFeature(fromSettings.settingsReducerKey, fromSettings.settingsReducer),
    EffectsModule.forFeature([SettingsEffects])
  ],
  providers: [
    SettingsFacade,
    ConsoleFacade
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
