import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SettingsService } from './settings.service';

@Component({
  selector: 'stim-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  fragment: string;

  constructor(private readonly _service: SettingsService,
              private readonly _route: ActivatedRoute,
              private readonly _router: Router) {}

  ngOnInit() {
    this._route.fragment.subscribe((fragment: string) => {
      this.fragment = fragment;
    });
    if (this._route.snapshot.fragment === undefined) {
      this._router.navigate([], {fragment: 'service-state', relativeTo: this._route, replaceUrl: true});
      return;
    }
  }
}
