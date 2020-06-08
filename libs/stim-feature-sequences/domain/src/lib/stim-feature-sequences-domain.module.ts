import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
})
export class StimFeatureSequencesDomainModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StimFeatureSequencesDomainModule,
      providers: [

      ]
    }
  }
}
