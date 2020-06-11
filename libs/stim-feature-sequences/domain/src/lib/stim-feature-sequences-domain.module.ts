import { ModuleWithProviders, NgModule } from "@angular/core";
import { StoreModule } from '@ngrx/store';

import * as fromSequences from './store/sequences.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(fromSequences.sequencesReducerKey, fromSequences.sequencesReducer)
  ],
})
export class StimFeatureSequencesDomainModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StimFeatureSequencesDomainModule,
      providers: [

      ]
    }
  }
}
