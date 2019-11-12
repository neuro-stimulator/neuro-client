import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { ServiceStateComponent } from './service-state/service-state.component';
import { ConsoleComponent } from './console/console.component';
import { ParamConfigComponent } from './param-config/param-config.component';

@NgModule({
  declarations: [
    SettingsComponent,
    ServiceStateComponent,
    ConsoleComponent,
    ParamConfigComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule {

}
