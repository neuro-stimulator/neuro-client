import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { StimLibConnectionModule } from '@diplomka-frontend/stim-lib-connection';
import { StimFeatureStimulatorDomainModule } from '@diplomka-frontend/stim-feature-stimulator/domain';

import { PlayerFacade } from './application-services/player.facade';
import * as fromPlayer from './store/player.reducer';
import { PlayerEffects } from './store/player.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(
      fromPlayer.playerReducerKey,
      fromPlayer.playerReducer
    ),
    EffectsModule.forFeature([PlayerEffects]),

    StimFeatureStimulatorDomainModule,
    StimLibConnectionModule,
  ],
  providers: [PlayerFacade],
})
export class StimFeaturePlayerDomainModule {}
