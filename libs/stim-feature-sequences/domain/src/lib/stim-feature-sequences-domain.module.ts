import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromSequences from './store/sequences.reducer';
import { SequencesEffects } from './store/sequences.effects';
import { SequencesFacade } from './application-services/sequences.facade';

@NgModule({
  imports: [
    StoreModule.forFeature(
      fromSequences.sequencesReducerKey,
      fromSequences.sequencesReducer
    ),
    EffectsModule.forFeature([SequencesEffects]),
  ],
  providers: [SequencesFacade],
})
export class StimFeatureSequencesDomainModule {
  // static forRoot(): ModuleWithProviders {
  //   return {
  //     ngModule: StimFeatureSequencesDomainModule,
  //     providers: [
  //       SequencesFacade
  //     ]
  //   }
  // }
}
