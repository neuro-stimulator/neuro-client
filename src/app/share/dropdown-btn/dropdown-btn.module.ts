import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DropdownBtnComponent } from './dropdown-btn.component';

@NgModule({
  declarations: [
    DropdownBtnComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DropdownBtnComponent
  ]
})
export class DropdownBtnModule {

}
