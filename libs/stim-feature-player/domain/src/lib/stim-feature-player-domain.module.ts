import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { PlayerFacade } from "./application-services/player.facade";

@NgModule({
  imports: [CommonModule],
})
export class StimFeaturePlayerDomainModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StimFeaturePlayerDomainModule,
      providers: [
        PlayerFacade
      ]
    }
  }
}
