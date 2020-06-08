import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { ContentTogglerDirective } from './content-toggler.directive';
import { ExperimentTypeResolverDirective } from './experiment-type-resolver.directive';
import { DateTimePipe } from './date-time.pipe';

@NgModule({
  declarations: [
    ContentTogglerDirective,
    ExperimentTypeResolverDirective,
    DateTimePipe
  ],
  imports: [
    CommonModule,

    TranslateModule.forChild()
  ],
  exports: [
    ContentTogglerDirective,
    ExperimentTypeResolverDirective,
    DateTimePipe
  ]
})
export class ShareModule {

}
