import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index'
  },
  {
    path: 'index',
    component: SettingsComponent,
    data: {title: 'SETTINGS.TITLE'}
  },
  {
    path: 'service-state',
    loadChildren: () => import('@diplomka-frontend/stim-feature-settings/feature/service-state').then((mod) => mod.StimFeatureSettingsFeatureServiceStateModule),
    outlet: 'settings'
  },
  {
    path: 'param-config',
    loadChildren: () => import('@diplomka-frontend/stim-feature-settings/feature/param-config').then((mod) => mod.StimFeatureSettingsFeatureParamConfigModule),
    outlet: 'settings'
  },
  {
    path: 'console',
    loadChildren: () => import('@diplomka-frontend/stim-feature-settings/feature/console').then((mod) => mod.StimFeatureSettingsFeatureConsoleModule),
    outlet: 'settings'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {

}
