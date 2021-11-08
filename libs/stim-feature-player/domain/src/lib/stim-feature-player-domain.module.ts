import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { StimLibConnectionModule } from '@neuro-client/stim-lib-connection';
import { StimFeatureStimulatorDomainModule } from '@neuro-client/stim-feature-stimulator/domain';
import { StimFeatureExperimentsDomainModule } from '@neuro-client/stim-feature-experiments/domain';

import { PlayerFacade } from './application-services/player.facade';
import * as fromPlayer from './store/player.reducer';
import { PlayerEffects } from './store/player.effects';
import { PlayerService } from './infrastructure/player.service';

@NgModule({
  imports: [
    StoreModule.forFeature(
      fromPlayer.playerReducerKey,
      fromPlayer.playerReducer
    ),
    EffectsModule.forFeature([PlayerEffects]),

    StimFeatureStimulatorDomainModule,
    StimFeatureExperimentsDomainModule,
    StimLibConnectionModule,
  ],
  providers: [PlayerService, PlayerFacade],
})
export class StimFeaturePlayerDomainModule {}
