import { NgModule } from "@angular/core";
import { StoreModule } from '@ngrx/store';

import * as fromSequences from './store/sequences.reducer';
import { SequencesFacade } from "./application-services/sequences.facade";

@NgModule({
  imports: [
    StoreModule.forFeature(fromSequences.sequencesReducerKey, fromSequences.sequencesReducer)
  ],
  providers: [
    SequencesFacade
  ]
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
