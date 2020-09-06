import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { StimLibCommonModule } from '@diplomka-frontend/stim-lib-common';
import { StimFeatureExperimentsDomainModule } from '@diplomka-frontend/stim-feature-experiments/domain';
import { StimulatorFacade } from '@diplomka-frontend/stim-feature-stimulator/domain';

import * as fromConsole from './store/console.reducer';
import { ConsoleEffects } from './store/console.effects';

@NgModule({
  imports: [
    StimLibCommonModule,
    StoreModule.forFeature(
      fromConsole.consoleReducerKey,
      fromConsole.consoleReducer
    ),
    EffectsModule.forFeature([ConsoleEffects]),
    StimFeatureExperimentsDomainModule,
  ],
  providers: [StimulatorFacade],
})
export class StimLibConsoleDomainModule {}
