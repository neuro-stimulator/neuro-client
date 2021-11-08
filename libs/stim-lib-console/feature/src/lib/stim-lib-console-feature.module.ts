import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

import { StimLibUiModule } from '@neuro-client/stim-lib-ui';
import { StimLibConsoleDomainModule } from '@neuro-client/stim-lib-console/domain';

import { ConsoleComponent } from './console.component';

@NgModule({
  declarations: [ConsoleComponent],
  imports: [StimLibUiModule, StimLibConsoleDomainModule, TranslateModule],
  exports: [ConsoleComponent],
})
export class StimLibConsoleFeatureModule {}
