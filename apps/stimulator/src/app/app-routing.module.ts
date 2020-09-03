import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'auth',
    pathMatch: 'prefix',
    loadChildren: () =>
      import('@diplomka-frontend/stim-feature-auth/feature').then(
        (mod) => mod.StimFeatureAuthFeatureModule
      ),
  },
  {
    path: 'profile',
    pathMatch: 'prefix',
    loadChildren: () =>
      import('@diplomka-frontend/stim-feature-users/feature').then(
        (mod) => mod.StimFeatureUsersFeatureModule
      ),
  },
  {
    path: 'player',
    pathMatch: 'prefix',
    loadChildren: () =>
      import('@diplomka-frontend/stim-feature-player/feature').then(
        (mod) => mod.StimFeaturePlayerFeatureModule
      ),
  },
  {
    path: 'settings',
    pathMatch: 'prefix',
    loadChildren: () =>
      import('@diplomka-frontend/stim-feature-settings/feature').then(
        (mod) => mod.StimFeatureSettingsFeatureModule
      ),
  },
  {
    path: 'help',
    pathMatch: 'prefix',
    loadChildren: () =>
      import('@diplomka-frontend/stim-feature-help/feature').then(
        (mod) => mod.StimFeatureHelpFeatureModule
      ),
  },
  {
    path: 'about',
    pathMatch: 'prefix',
    loadChildren: () =>
      import('@diplomka-frontend/stim-feature-about').then(
        (mod) => mod.StimFeatureAboutModule
      ),
  },
  {
    path: 'stimulator',
    pathMatch: 'prefix',
    loadChildren: () =>
      import('@diplomka-frontend/stim-feature-stimulator/feature').then(
        (mod) => mod.StimFeatureStimulatorFeatureModule
      ),
  },
  {
    path: 'experiments',
    loadChildren: () =>
      import('@diplomka-frontend/stim-feature-experiments/feature').then(
        (mod) => mod.StimFeatureExperimentsFeatureModule
      ),
  },
  {
    path: 'results',
    pathMatch: 'prefix',
    loadChildren: () =>
      import('@diplomka-frontend/stim-feature-experiment-results/feature').then(
        (mod) => mod.StimFeatureExperimentResultsFeatureModule
      ),
  },
  {
    path: 'sequences',
    pathMatch: 'prefix',
    loadChildren: () =>
      import('@diplomka-frontend/stim-feature-sequences/feature').then(
        (mod) => mod.StimFeatureSequencesFeatureModule
      ),
  },

  {
    path: '404',
    component: PageNotFoundComponent,
    data: { title: 'PAGE_NOT_FOUND.TITLE' },
  },
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'experiments/list',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
