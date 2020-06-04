import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: 'index',
    component: SettingsComponent,
    data: {title: 'SETTINGS.TITLE'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {

}
