import { NgModule } from "@angular/core";
import { ParamConfigComponent } from "./param-config.component";
import { ParamConfigExperimentsComponent } from "./param-config-experiments/param-config-experiments.component";
import { ParamConfigServerComponent } from "./param-config-server/param-config-server.component";
import { ParamConfigApplicationComponent } from "./param-config-application/param-config-application.component";
import { StimLibUiModule } from "@diplomka-frontend/stim-lib-ui";
import { ParamConfigRoutingModule } from "./param-config-routing.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    ParamConfigComponent,
    ParamConfigExperimentsComponent,
    ParamConfigServerComponent,
    ParamConfigApplicationComponent
  ],
  imports: [
    StimLibUiModule,
    ParamConfigRoutingModule,
    TranslateModule
  ],
  exports: [
    ParamConfigComponent
  ]
})
export class ParamConfigModule {

}
