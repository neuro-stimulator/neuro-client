import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FabComponent } from './fab.component';

@NgModule({
  declarations: [
    FabComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FabComponent
  ]
})
export class FabModule {

}
