import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { StimLibCommonModule } from "@diplomka-frontend/stim-lib-common";
import { StimFeatureExperimentsDomainModule } from "@diplomka-frontend/stim-feature-experiments/domain";

import { LOCAL_COMMAND_HANDLER_PROVIDERS } from "./local-command-handlers/command-tokens";
import * as fromConsole from "./store/console.reducer";
import { ConsoleEffects } from "./store/console.effects";

@NgModule({
  imports: [
    StimLibCommonModule,
    StoreModule.forFeature(
      fromConsole.consoleReducerKey,
      fromConsole.consoleReducer
    ),
    EffectsModule.forFeature([ConsoleEffects]),
    StimFeatureExperimentsDomainModule
  ],
  providers: [...LOCAL_COMMAND_HANDLER_PROVIDERS]
})
export class StimLibConsoleDomainModule {
}
