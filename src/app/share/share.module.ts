import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentTogglerDirective } from './content-toggler.directive';
import { ExperimentTypeResolverDirective } from './experiment-type-resolver.directive';
import { ExperimentsButtonsAddonComponent } from './buttons-addons/experiments-buttons-addon/experiments-buttons-addon.component';
import { DateTimePipe } from './date-time.pipe';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ContentTogglerDirective,
    ExperimentTypeResolverDirective,
    ExperimentsButtonsAddonComponent,
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
