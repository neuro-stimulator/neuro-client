import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { StimLibCommonModule } from '@diplomka-frontend/stim-lib-common';
import { StimFeatureExperimentsDomainModule } from '@diplomka-frontend/stim-feature-experiments/domain';

import * as fromStimulator from './store/stimulator.reducer';
import { StimulatorEffects } from './store/stimulator.effects';
import { StimulatorFacade } from './application-services/stimulator.facade';

@NgModule({
  imports: [
    StimLibCommonModule,
    StoreModule.forFeature(
      fromStimulator.stimulatorReducerKey,
      fromStimulator.stimulatorReducer
    ),
    EffectsModule.forFeature([StimulatorEffects]),
    StimFeatureExperimentsDomainModule,
  ],
  providers: [StimulatorFacade],
})
export class StimFeatureStimulatorDomainModule {}
