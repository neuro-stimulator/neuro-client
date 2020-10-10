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
import { StopConditionsComponent } from './stop-conditions/stop-conditions.component';
import { CountingCycleComponent } from './stop-conditions/stop-condition/counting-cycle/counting-cycle.component';
import { CountingExperimentComponent } from './stop-conditions/stop-condition/counting-experiment/counting-experiment.component';
import { NoConditionComponent } from './stop-conditions/stop-condition/no-condition/no-condition.component';
import { StopConditionDirective } from './stop-conditions/stop-condition.directive';
import { StopConditionComponentProvider } from './stop-conditions/stop-condition-component.provider';

@NgModule({
  declarations: [
    PlayerComponent,
    PlayerPageToolsComponent,
    StopConditionsComponent,
    NoConditionComponent,
    CountingCycleComponent,
    CountingExperimentComponent,
    PlayerExperimentTypeResolverDirective,
    StopConditionDirective,
  ],
  imports: [
    StimLibUiModule,
    PlayerRoutingModule,
    StimFeatureSettingsFeatureServiceStateModule,
    StimFeatureExperimentsDomainModule,
    TranslateModule,
    StimFeaturePlayerDomainModule,
  ],
  providers: [StopConditionComponentProvider],
})
export class StimFeaturePlayerFeatureModule {}
