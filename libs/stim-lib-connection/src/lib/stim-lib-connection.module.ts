import { ModuleWithProviders, NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromConnection  from './store/connection.reducers';
import { AliveCheckerFacade } from './application-services/alive-checker.facade';
import { ConnectionEffects } from './store/connection.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(fromConnection.connectionStateKey, fromConnection.connectionStateReducer),
    EffectsModule.forFeature([ConnectionEffects])
  ],
})
export class StimLibConnectionModule {
  static forRoot(): ModuleWithProviders<StimLibConnectionModule> {
    return {
      ngModule: StimLibConnectionModule,
      providers: [
        AliveCheckerFacade
      ]
    }
  }
}
