import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";

import * as fromNavigation from './store/navigation.reducer';
import { NavigationFacade } from "./application-services/navigation.facade";
import { EffectsModule } from "@ngrx/effects";
import { NavigationEffects } from "./store/navigation.effects";
import { NavigationConnectionEffects } from "./store/navigation-connection.effects";

@NgModule({
  imports: [
    StoreModule.forFeature(fromNavigation.navigationReducerKey, fromNavigation.navigationReducer),
    EffectsModule.forFeature([NavigationEffects, NavigationConnectionEffects])
  ],
  providers: [
    NavigationFacade
  ]
})
export class StimFeatureNavigationDomainModule {}
