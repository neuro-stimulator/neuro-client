import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PlayerComponent } from './player.component';

const routes: Routes = [
  {
    path: ':type/:id',
    pathMatch: 'prefix',
    component: PlayerComponent,
    data: {title: 'EXPERIMENT_PLAYER.TITLE', intro: 'control-player-steps'}
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
