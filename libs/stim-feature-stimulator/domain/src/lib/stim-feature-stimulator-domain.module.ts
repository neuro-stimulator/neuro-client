import { ModuleWithProviders, NgModule } from "@angular/core";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { StimLibCommonModule } from "@diplomka-frontend/stim-lib-common";

import * as fromStimulator from './store/stimulator.reducer';
import { StimulatorEffects } from "./store/stimulator.effects";
import { StimulatorFacade } from "./application-services/stimulator.facade";

@NgModule({
  imports: [
    StimLibCommonModule,
    StoreModule.forFeature(fromStimulator.stimulatorReducerKey, fromStimulator.stimulatorReducer),
    EffectsModule.forFeature([StimulatorEffects])
  ],
})
export class StimFeatureStimulatorDomainModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StimFeatureStimulatorDomainModule,
      providers: [
        StimulatorFacade
      ]
    }
  }
}
