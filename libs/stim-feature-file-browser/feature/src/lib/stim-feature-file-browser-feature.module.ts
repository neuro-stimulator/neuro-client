import { NgModule } from '@angular/core';

import { StimLibUiModule } from '@diplomka-frontend/stim-lib-ui';
import { StimFeatureFileBrowserDomainModule } from '@diplomka-frontend/stim-feature-file-browser/domain';

import { FileBrowserComponent } from './file-browser.component';

@NgModule({
  declarations: [
    FileBrowserComponent
  ],
  imports: [
    StimLibUiModule,
    StimFeatureFileBrowserDomainModule.forRoot()
  ],
  exports: [
    FileBrowserComponent
  ]
})
export class StimFeatureFileBrowserFeatureModule {}
