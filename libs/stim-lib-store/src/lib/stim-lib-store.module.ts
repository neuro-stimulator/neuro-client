import { NgModule } from '@angular/core';

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import * as fromApp from "./store/app.reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

@NgModule({
  imports: [
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument()
  ]
})
export class StimLibStoreModule {}
