import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperimentsRoutingModule } from '../experiments/experiments-routing.module';

import { ContentTogglerDirective } from './content-toggler.directive';
import { ExperimentTypeResolverDirective } from './experiment-type-resolver.directive';
import { ExperimentsButtonsAddonComponent } from './buttons-addons/experiments-buttons-addon/experiments-buttons-addon.component';
import { DateTimePipe } from './date-time.pipe';

@NgModule({
  declarations: [
    ContentTogglerDirective,
    ExperimentTypeResolverDirective,
    ExperimentsButtonsAddonComponent,
    DateTimePipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ContentTogglerDirective,
    ExperimentTypeResolverDirective,
    DateTimePipe
  ],
  entryComponents: [
    ExperimentsButtonsAddonComponent
  ]
})
export class ShareModule {

}
