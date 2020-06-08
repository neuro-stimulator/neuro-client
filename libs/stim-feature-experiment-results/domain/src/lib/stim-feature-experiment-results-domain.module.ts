import { NgModule } from '@angular/core';

import { StoreModule } from "@ngrx/store";

import * as fromExperimentResults from './store/experiment-results.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(fromExperimentResults.experimentResultsReducerKey, fromExperimentResults.experimentResultsReducer)
  ],
})
export class StimFeatureExperimentResultsDomainModule {}
