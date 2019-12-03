import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: 'experiments',
    pathMatch: 'prefix',
    loadChildren: () => import('./experiments/experiments.module').then(mod => mod.ExperimentsModule)
  },
  {
    path: 'player',
    pathMatch: 'prefix',
    loadChildren: () => import('./player/player.module').then(mod => mod.PlayerModule)
  },
  {
    path: 'simulation',
    pathMatch: 'prefix',
    loadChildren: () => import('./simulation/simulation.module').then(mod => mod.SimulationModule)
  },
  {
    path: 'settings',
    pathMatch: 'prefix',
    loadChildren: () => import('./settings/settings.module').then(mod => mod.SettingsModule)
  },
  {
    path: 'help',
    pathMatch: 'prefix',
    loadChildren: () => import('./help/help.module').then(mod => mod.HelpModule)
  },
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'experiments'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      enableTracing: true
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
