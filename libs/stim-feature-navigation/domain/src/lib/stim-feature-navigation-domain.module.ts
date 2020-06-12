import { ModuleWithProviders, NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";

import * as fromNavigation from './store/navigation.reducer';
import { NavigationFacade } from "./application-services/navigation.facade";
import { NavigationService } from "./infrastructure/navigation.service";
import { EffectsModule } from "@ngrx/effects";
import { NavigationEffects } from "./store/navigation.effects";

@NgModule({
  imports: [
    StoreModule.forFeature(fromNavigation.navigationReducerKey, fromNavigation.navigationReducer),
    EffectsModule.forFeature([NavigationEffects])
  ],
})
export class StimFeatureNavigationDomainModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StimFeatureNavigationDomainModule,
      providers: [
        NavigationFacade,
        NavigationService
      ]
    }
  }
}
