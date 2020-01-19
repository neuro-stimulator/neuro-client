import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { ServiceStateComponent } from './service-state/service-state.component';
import { ConsoleComponent } from './console/console.component';
import { ParamConfigComponent } from './param-config/param-config.component';
import { ParamConfigExperimentsComponent } from './param-config/param-config-experiments/param-config-experiments.component';
import { FabModule } from '../share/fab/fab.module';
import { ShareModule } from '../share/share.module';
import { ParamConfigServerComponent } from './param-config/param-config-server/param-config-server.component';
import { createTranslateLoader } from '../app.module';



@NgModule({
  declarations: [
    SettingsComponent,
    ServiceStateComponent,
    ConsoleComponent,
    ParamConfigComponent,
    ParamConfigExperimentsComponent,
    ParamConfigServerComponent
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
    FabModule,
    ShareModule,
  ]
})
export class SettingsModule {

}
