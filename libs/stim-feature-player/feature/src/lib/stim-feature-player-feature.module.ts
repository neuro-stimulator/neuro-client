import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

import { StimLibUiModule } from '@diplomka-frontend/stim-lib-ui';
import { StimFeaturePlayerDomainModule } from '@diplomka-frontend/stim-feature-player/domain';
import { StimFeatureSettingsFeatureServiceStateModule } from '@diplomka-frontend/stim-feature-settings/feature/service-state';
import { StimFeatureExperimentsDomainModule } from '@diplomka-frontend/stim-feature-experiments/domain';

import { PlayerComponent } from './player.component';
import { PlayerPageToolsComponent } from './player-page-tools/player-page-tools.component';
import { PlayerRoutingModule } from './player-routing.module';
import { PlayerExperimentTypeResolverDirective } from './player-experiment-type-resolver.directive';

@NgModule({
  declarations: [
    PlayerComponent,
    PlayerPageToolsComponent,
    PlayerExperimentTypeResolverDirective,
  ],
  imports: [
    StimLibUiModule,
    PlayerRoutingModule,
    StimFeatureSettingsFeatureServiceStateModule,
    StimFeatureExperimentsDomainModule,
    TranslateModule,
    StimFeaturePlayerDomainModule,
  ],
})
export class StimFeaturePlayerFeatureModule {}
