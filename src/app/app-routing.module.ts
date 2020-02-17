import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: 'experiments',
    pathMatch: 'prefix',
    loadChildren: () => import('./experiments/experiments.module').then(mod => mod.ExperimentsModule)
  },
  {
    path: 'results',
    pathMatch: 'prefix',
    loadChildren: () => import('./experiment-results/experiment-results.module').then(mod => mod.ExperimentResultsModule)
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
    path: 'about',
    pathMatch: 'prefix',
    loadChildren: () => import('./about/about.module').then(mod => mod.AboutModule)
  },
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'experiments'
  },
  {
    path: '**',
    redirectTo: '/about'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
