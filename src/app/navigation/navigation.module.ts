import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationComponent } from './navigation.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    NavigationComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavigationComponent,
    SidebarComponent,
  ]
})
export class NavigationModule {

}
