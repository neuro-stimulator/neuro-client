import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'player',
    pathMatch: 'prefix',
    loadChildren: () => import('./player/player.module').then(mod => mod.PlayerModule)
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
    path: 'experiments',
    loadChildren: () => import('./experiments/experiments.module').then(mod => mod.ExperimentsModule)
  },
  {
    path: 'results',
    pathMatch: 'prefix',
    loadChildren: () => import('./experiment-results/experiment-results.module').then(mod => mod.ExperimentResultsModule)
  },
  {
    path: 'sequences',
    pathMatch: 'prefix',
    loadChildren: () => import('./sequences/sequences.module').then(mod => mod.SequencesModule)
  },

  {
    path: '404',
    component: PageNotFoundComponent,
    data: {title: 'PAGE_NOT_FOUND.TITLE'}
  },
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'experiments/list'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
