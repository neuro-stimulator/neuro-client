import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { TranslateModule } from "@ngx-translate/core";

import { StimFeatureNavigationDomainModule } from "@diplomka-frontend/stim-feature-navigation/domain";
import { StimLibUiModule } from "@diplomka-frontend/stim-lib-ui";

import { SidebarComponent } from "./sidebar/sidebar.component";
import { NavigationButtonsAddonDirective } from "./navigation-buttons-addon.directive";
import { NavigationComponent } from "./navigation.component";
import { StimLibConnectionModule } from "@diplomka-frontend/stim-lib-connection";

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
    StimLibUiModule,
    StimFeatureNavigationDomainModule,
    StimLibConnectionModule
  ],
  exports: [
    SidebarComponent,
    NavigationButtonsAddonDirective,
    NavigationComponent
  ]
})
export class StimFeatureNavigationFeatureModule {}
