import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PlayerComponent } from './player.component';

const routes: Routes = [
  {
    path: ':type/:id',
    pathMatch: 'prefix',
    component: PlayerComponent,
    data: {title: 'Přehrávač experimentu'}
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PlayerRoutingModule {

}
