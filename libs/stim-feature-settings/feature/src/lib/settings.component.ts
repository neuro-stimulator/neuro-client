import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsFacade } from "@diplomka-frontend/stim-feature-settings/domain";


@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  fragment: string;

  constructor(private readonly _settings: SettingsFacade,
              private readonly _route: ActivatedRoute,
              private readonly _router: Router) {}

  ngOnInit() {
    this._settings.loadLocalSettings();
    this._settings.loadServerSettings();
    // this._route.fragment.subscribe((fragment: string) => {
    //   this.fragment = fragment;
    // });
    // if (this._route.snapshot.fragment === undefined) {
    //   this._router.navigate([], {fragment: 'service-state', relativeTo: this._route, replaceUrl: true});
    //   return;
    // }
  }
}
