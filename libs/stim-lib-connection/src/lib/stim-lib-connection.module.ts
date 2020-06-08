import { ModuleWithProviders, NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";

import * as fromConnection  from "./store/connection.reducers";
import { AliveCheckerFacade } from "./application-services/alive-checker.facade";

@NgModule({
  imports: [
    StoreModule.forFeature(fromConnection.connectionStateKey, fromConnection.connectionStateReducer)
  ],
})
export class StimLibConnectionModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StimLibConnectionModule,
      providers: [
        AliveCheckerFacade
      ]
    }
  }
}
