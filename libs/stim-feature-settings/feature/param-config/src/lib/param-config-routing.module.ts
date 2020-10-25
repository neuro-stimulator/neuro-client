import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ParamConfigComponent } from './param-config.component';

const routes: Routes = [
  {
    path: '',
    component: ParamConfigComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParamConfigRoutingModule {

}
