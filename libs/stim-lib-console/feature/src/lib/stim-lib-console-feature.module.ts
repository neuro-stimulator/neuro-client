import { NgModule } from "@angular/core";

import { StimLibUiModule } from "@diplomka-frontend/stim-lib-ui";
import { StimLibConsoleDomainModule } from "@diplomka-frontend/stim-lib-console/domain";

import { ConsoleComponent } from "./console.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [ConsoleComponent],
  imports: [StimLibUiModule, StimLibConsoleDomainModule, TranslateModule],
  exports: [ConsoleComponent]
})
export class StimLibConsoleFeatureModule {
}
