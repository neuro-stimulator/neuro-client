import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthFacade } from './application-services/auth.facade';
import { AuthEffects } from './store/auth.effects';
import * as fromAuth from './store/auth.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(fromAuth.authReducerKey, fromAuth.authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [AuthFacade],
})
export class StimFeatureAuthDomainModule {}
