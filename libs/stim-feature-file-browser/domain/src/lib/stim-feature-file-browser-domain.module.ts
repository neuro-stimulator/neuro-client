import { ModuleWithProviders, NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import * as fromFileBrowser from '../lib/store/file-browser-reducer';
import { FileBrowserEffects } from "./store/file-browser-effects";
import { FileBrowserFacade } from "./application-services/file-browser.facade";

@NgModule({
  imports: [
    StoreModule.forFeature(fromFileBrowser.fileBrowserReducerKey, fromFileBrowser.fileBrowserReducer),
    EffectsModule.forFeature([FileBrowserEffects])
  ],
})
export class StimFeatureFileBrowserDomainModule {
  static forRoot(): ModuleWithProviders<StimFeatureFileBrowserDomainModule> {
    return {
      ngModule: StimFeatureFileBrowserDomainModule,
      providers: [FileBrowserFacade]
    }
  }
}
