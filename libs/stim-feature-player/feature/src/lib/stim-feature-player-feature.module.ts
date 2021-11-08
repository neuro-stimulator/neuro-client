import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

import { StimLibUiModule } from '@neuro-client/stim-lib-ui';
import { StimFeaturePlayerDomainModule } from '@neuro-client/stim-feature-player/domain';
import { StimFeatureSettingsFeatureServiceStateModule } from '@neuro-client/stim-feature-settings/feature/service-state';
import { StimFeatureExperimentsDomainModule } from '@neuro-client/stim-feature-experiments/domain';

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
