import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { ExperimentsButtonsAddonService } from './experiments-buttons-addon.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'stim-experiments-buttons-addon',
  templateUrl: './experiments-buttons-addon.component.html',
  styleUrls: ['./experiments-buttons-addon.component.sass']
})
export class ExperimentsButtonsAddonComponent implements OnInit, OnDestroy {

  hideFinderBox = true;
  initialSearchValue: string;
  showButtons = true;

  private _addonVisibleSubscription: Subscription;

  constructor(private readonly _service: ExperimentsButtonsAddonService,
              private readonly _route: ActivatedRoute) { }

  private _notifySearchValue(value: string) {
    this._service.searchValue.next(value);
  }

  ngOnInit() {
    this._addonVisibleSubscription = this._service.addonVisible.subscribe((visible) => this.showButtons = visible);
    this._route.fragment.subscribe((value) => {
      this.initialSearchValue = value || '';
      this._notifySearchValue(this.initialSearchValue);
    });
  }

  ngOnDestroy(): void {
    this._addonVisibleSubscription.unsubscribe();
  }

  handleShowFilter() {
    this._service.filterRequest.next();
  }

  handleSearchInputChange(event: Event) {
    const value: string = (event.target as HTMLInputElement).value;
    this._notifySearchValue(value || '');
  }
}
