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
    loadChildren: () => import('./service-state/service-state.module').then((mod) => mod.ServiceStateModule),
    outlet: 'settings'
  },
  {
    path: 'param-config',
    loadChildren: () => import('./param-config/param-config.module').then((mod) => mod.ParamConfigModule),
    outlet: 'settings'
  },
  {
    path: 'console',
    loadChildren: () => import('./console/console.module').then((mod) => mod.ConsoleModule),
    outlet: 'settings'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {

}
