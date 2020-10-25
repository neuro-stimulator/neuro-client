import { ModuleWithProviders, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromExperiments from './store/experiments.reducer';
import { ExperimentsFacade } from './application-services/experiments.facade';
import { ExperimentsEffects } from './store/experiments.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(fromExperiments.experimentsReducerKey, fromExperiments.experimentsReducer),
    EffectsModule.forFeature([ExperimentsEffects])
  ],
  providers: [
    ExperimentsFacade
  ]
})
export class StimFeatureExperimentsDomainModule {
  // static forRoot(): ModuleWithProviders {
  //   return {
  //     ngModule: StimFeatureExperimentsDomainModule,
  //     providers: [
  //       ExperimentsFacade
  //     ]
  //   }
  // }
}
