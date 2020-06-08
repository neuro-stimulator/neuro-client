import { ModuleWithProviders, NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";

import * as fromFileBrowser from '../lib/store/file-browser-reducer';
import { FileBrowserFacade } from "./application-services/file-browser.facade";

@NgModule({
  imports: [
    StoreModule.forFeature(fromFileBrowser.fileBrowserReducerKey, fromFileBrowser.fileBrowserReducer)
  ],
})
export class StimFeatureFileBrowserDomainModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StimFeatureFileBrowserDomainModule,
      providers: [FileBrowserFacade]
    }
  }
}
