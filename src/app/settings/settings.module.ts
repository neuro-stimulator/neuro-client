import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { ServiceStateComponent } from './service-state/service-state.component';
import { ConsoleComponent } from './console/console.component';
import { ParamConfigComponent } from './param-config/param-config.component';
import { ParamConfigExperimentsComponent } from './param-config/param-config-experiments/param-config-experiments.component';
import { FabModule } from '../share/fab/fab.module';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [
    SettingsComponent,
    ServiceStateComponent,
    ConsoleComponent,
    ParamConfigComponent,
    ParamConfigExperimentsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    FabModule,
    ShareModule,
  ]
})
export class SettingsModule {

}
