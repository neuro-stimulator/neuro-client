import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { SettingsFacade, SettingsState } from '@diplomka-frontend/stim-feature-settings/domain';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  private _routerSubscription: Subscription;

  constructor(private readonly _settings: SettingsFacade, private readonly _route: ActivatedRoute, private readonly _router: Router) {}

  ngOnInit() {
    this._settings.loadServerSettings();
    this._routerSubscription = this._route.fragment.subscribe((fragment: string) => {
      this._settings.fragment = fragment;
    });
    if (this._route.snapshot.fragment === undefined) {
      this._router.navigate([], { fragment: 'service-state', relativeTo: this._route, replaceUrl: true });
      return;
    }
    // this._routerSubscription = this._router.events.pipe(
    //   filter((event: RouterEvent) => event instanceof NavigationEnd),
    //   filter(() => this._router.getCurrentNavigation().extractedUrl !== undefined),
    //   map(() => this._router.getCurrentNavigation()
    //     .extractedUrl.root.children.primary.children.tab !== undefined)
    // ).subscribe((isActive) => {
    //   if (!isActive) {
    //     this._router.navigate([{outlets: {tab: ['service-state']}}], { relativeTo: this._route});
    //   }
    // });
  }

  ngOnDestroy(): void {
    this._routerSubscription.unsubscribe();
  }

  get state(): Observable<SettingsState> {
    return this._settings.state;
  }
}
