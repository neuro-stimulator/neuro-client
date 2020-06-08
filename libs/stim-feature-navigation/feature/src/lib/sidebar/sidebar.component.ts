import { Component, OnInit } from '@angular/core';
import { NavigationFacade } from "@diplomka-frontend/stim-feature-navigation/domain";

@Component({
  selector: 'stim-feature-navigation-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  constructor(public navigation: NavigationFacade) {
  }

  ngOnInit() {}

  handleCloseSidebar() {
    this.navigation.showSidebar = false;
  }
}
