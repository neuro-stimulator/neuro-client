import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { ListButtonsAddonComponent } from './list-buttons-addon.component';

@NgModule({
  declarations: [
    ListButtonsAddonComponent
  ],
  imports: [
    TranslateModule,
    CommonModule
  ],
  exports: [
    ListButtonsAddonComponent
  ]
})
export class ListButtonsAddonModule {

}
