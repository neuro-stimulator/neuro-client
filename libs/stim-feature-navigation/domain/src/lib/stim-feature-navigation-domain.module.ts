import { ModuleWithProviders, NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";

import * as fromNavigation from './store/navigation.reducer';
import { NavigationFacade } from "./application-services/navigation.facade";

@NgModule({
  imports: [
    StoreModule.forFeature(fromNavigation.navigationReducerKey, fromNavigation.navigationReducer)
  ],
})
export class StimFeatureNavigationDomainModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StimFeatureNavigationDomainModule,
      providers: [
        NavigationFacade
      ]
    }
  }
}
