import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {

  showSidebar: boolean;

  constructor(private _navigation: NavigationService, private readonly _route: Router) {
  }

  ngOnInit() {
    this.showSidebar = true;

    this._route.events.subscribe((event: Event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }

    });

  }

  handleToggleSidebar() {
    this._navigation.toggle();
  }
}
