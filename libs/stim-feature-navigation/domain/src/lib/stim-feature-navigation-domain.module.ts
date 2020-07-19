import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromNavigation from './store/navigation.reducer';
import { NavigationFacade } from './application-services/navigation.facade';
import { NavigationEffects } from './store/navigation.effects';
import { NavigationConnectionEffects } from './store/navigation-connection.effects';
import { ComponentStoreService } from './infrastructure/component-store.service';

@NgModule({
  imports: [
    StoreModule.forFeature(
      fromNavigation.navigationReducerKey,
      fromNavigation.navigationReducer
    ),
    EffectsModule.forFeature([NavigationEffects, NavigationConnectionEffects]),
  ],
  providers: [NavigationFacade, ComponentStoreService],
})
export class StimFeatureNavigationDomainModule {}
