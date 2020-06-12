import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from "@angular/router";
import { SettingsFacade } from "@diplomka-frontend/stim-feature-settings/domain";
import { Observable, Subscription } from "rxjs";
import { filter, map, tap } from "rxjs/operators";


@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit, OnDestroy {

  private _routerSubscription: Subscription;

  constructor(private readonly _settings: SettingsFacade,
              private readonly _route: ActivatedRoute,
              private readonly _router: Router) {}

  ngOnInit() {
    this._routerSubscription = this._router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      filter(() => this._router.getCurrentNavigation().extractedUrl !== undefined),
      map(() => this._router.getCurrentNavigation()
        .extractedUrl.root.children.primary.children.tab !== undefined)
    ).subscribe((isActive) => {
      if (!isActive) {
        this._router.navigate([{outlets: {tab: ['service-state']}}], { relativeTo: this._route});
      }
    });
  }

  ngOnDestroy(): void {
    this._routerSubscription.unsubscribe();
  }
}
