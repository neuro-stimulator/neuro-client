import { NgModule } from '@angular/core';
import { ContentTogglerDirective } from './content-toggler.directive';
import { ExperimentTypeResolverDirective } from './experiment-type-resolver.directive';
import { ExperimentsButtonsAddonComponent } from './buttons-addons/experiments-buttons-addon/experiments-buttons-addon.component';

@NgModule({
  declarations: [
    ContentTogglerDirective,
    ExperimentTypeResolverDirective,
    ExperimentsButtonsAddonComponent,
  ],
  imports: [

  ],
  exports: [
    ContentTogglerDirective,
    ExperimentTypeResolverDirective,
  ],
  entryComponents: [
    ExperimentsButtonsAddonComponent
  ]
})
export class ShareModule {

}
