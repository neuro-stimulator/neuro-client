import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { StimLibUiModule } from '@neuro-client/stim-lib-ui';
import { StimFeatureNavigationDomainModule } from '@neuro-client/stim-feature-navigation/domain';
import { StimLibConnectionModule } from '@neuro-client/stim-lib-connection';
import { StimFeatureAuthDomainModule } from '@neuro-client/stim-feature-auth/domain';

import { SidebarComponent } from './sidebar/sidebar.component';
import { NavigationButtonsAddonDirective } from './navigation-buttons-addon.directive';
import { NavigationComponent } from './navigation.component';

@NgModule({
  declarations: [
    NavigationComponent,
    SidebarComponent,
    NavigationButtonsAddonDirective,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    RouterModule,
    StimLibUiModule,
    StimFeatureNavigationDomainModule,
    StimFeatureAuthDomainModule,
    StimLibConnectionModule,
  ],
  exports: [
    SidebarComponent,
    NavigationButtonsAddonDirective,
    NavigationComponent,
  ],
})
export class StimFeatureNavigationFeatureModule {}
