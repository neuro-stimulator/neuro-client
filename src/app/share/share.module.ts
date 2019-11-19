import { NgModule } from '@angular/core';
import { ContentTogglerDirective } from './content-toggler.directive';
import { ExperimentTypeResolverDirective } from './experiment-type-resolver.directive';

@NgModule({
  declarations: [
    ContentTogglerDirective,
    ExperimentTypeResolverDirective
  ],
  imports: [

  ],
  exports: [
    ContentTogglerDirective,
    ExperimentTypeResolverDirective
  ]
})
export class ShareModule {

}
