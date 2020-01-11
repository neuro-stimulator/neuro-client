import { NgModule } from '@angular/core';
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
