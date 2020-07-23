import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromExperimentResults from './store/experiment-results.reducer';
import { ExperimentResultsFacade } from './application-services/experiment-results.facade';
import { ExperimentResultssEffects } from './store/experiment-results.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(
      fromExperimentResults.experimentResultsReducerKey,
      fromExperimentResults.experimentResultsReducer
    ),
    EffectsModule.forFeature([ExperimentResultssEffects]),
  ],
  providers: [ExperimentResultsFacade],
})
export class StimFeatureExperimentResultsDomainModule {}
