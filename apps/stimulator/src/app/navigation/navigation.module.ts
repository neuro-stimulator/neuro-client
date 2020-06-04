import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { ModalModule } from '@diplomka-frontend/stim-lib-modal';

import { NavigationComponent } from './navigation.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavigationButtonsAddonDirective } from './navigation-buttons-addon.directive';

@NgModule({
  declarations: [
    NavigationComponent,
    SidebarComponent,
    NavigationButtonsAddonDirective
  ],
    imports: [
        CommonModule,
        TranslateModule.forChild(),
        RouterModule,
        ModalModule,
    ],
  exports: [
    NavigationComponent,
    SidebarComponent,
    NavigationButtonsAddonDirective
  ]
})
export class NavigationModule {

}
