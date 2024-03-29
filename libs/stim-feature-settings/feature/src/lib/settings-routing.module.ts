import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LocalSettingsResolver } from '@neuro-client/stim-feature-settings/domain';
import { ServerSettingsResolver } from '@neuro-client/stim-feature-settings/domain';

import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    resolve: [LocalSettingsResolver, ServerSettingsResolver],
    data: {title: 'SETTINGS.TITLE'}
  }
  // {
  //   path: 'service-state',
  //   loadChildren: () => import('@neuro-client/stim-feature-settings/feature/service-state').then((mod) => mod.StimFeatureSettingsFeatureServiceStateModule),
  //   outlet: 'tab'
  // },
  // {
  //   path: 'param-config',
  //   loadChildren: () => import('@neuro-client/stim-feature-settings/feature/param-config').then((mod) => mod.StimFeatureSettingsFeatureParamConfigModule),
  //   outlet: 'tab'
  // },
  // {
  //   path: 'console',
  //   loadChildren: () => import('@neuro-client/stim-feature-settings/feature/console').then((mod) => mod.StimFeatureSettingsFeatureConsoleModule),
  //   outlet: 'tab'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {

}
