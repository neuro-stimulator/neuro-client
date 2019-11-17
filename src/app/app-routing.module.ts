import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'experiments'
  },
  {
    path: 'experiments',
    loadChildren: () => import('./experiments/experiments.module').then(mod => mod.ExperimentsModule)
  },
  {
    path: 'player',
    loadChildren: () => import('./player/player.module').then(mod => mod.PlayerModule)
  },
  {
    path: 'simulation',
    loadChildren: () => import('./simulation/simulation.module').then(mod => mod.SimulationModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(mod => mod.SettingsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
