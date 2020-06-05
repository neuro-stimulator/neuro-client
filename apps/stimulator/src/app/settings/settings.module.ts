import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { StimLibUiModule } from "@diplomka-frontend/stim-lib-ui";

import { createTranslateLoader } from '../app.module';
import { ShareModule } from '../share/share.module';

import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { ServiceStateComponent } from './service-state/service-state.component';
import { ConsoleComponent } from './console/console.component';
import { ParamConfigComponent } from './param-config/param-config.component';
import { ParamConfigExperimentsComponent } from './param-config/param-config-experiments/param-config-experiments.component';
import { ParamConfigServerComponent } from './param-config/param-config-server/param-config-server.component';
import { ParamConfigApplicationComponent } from './param-config/param-config-application/param-config-application.component';

@NgModule({
  declarations: [
    SettingsComponent,
    ServiceStateComponent,
    ConsoleComponent,
    ParamConfigComponent,
    ParamConfigExperimentsComponent,
    ParamConfigServerComponent,
    ParamConfigApplicationComponent
  ],
  exports: [
    ParamConfigExperimentsComponent,
    ServiceStateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),

    SettingsRoutingModule,
    ShareModule,
    StimLibUiModule
  ]
})
export class SettingsModule {

}
