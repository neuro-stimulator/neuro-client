import { NgModule } from '@angular/core';

import { StimLibUiModule } from '@neuro-client/stim-lib-ui';
import { StimFeatureFileBrowserDomainModule } from '@neuro-client/stim-feature-file-browser/domain';

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
