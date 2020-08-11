import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { ListButtonsAddonService } from './list-buttons-addon.service';

@Component({
  templateUrl: './list-buttons-addon.component.html',
  styleUrls: ['./list-buttons-addon.component.sass'],
})
export class ListButtonsAddonComponent implements OnInit, OnDestroy {
  hideFinderBox = true;
  initialSearchValue: string;

  private _addonVisibleSubscription: Subscription;

  constructor(
    private readonly _service: ListButtonsAddonService,
    private readonly _route: ActivatedRoute
  ) {}

  private _notifySearchValue(value: string) {
    this._service.searchValue.next(value);
  }

  ngOnInit() {
    this._route.fragment.subscribe((value) => {
      this.initialSearchValue = value || '';
      this._notifySearchValue(this.initialSearchValue);
    });
  }

  ngOnDestroy(): void {
    this._addonVisibleSubscription?.unsubscribe();
  }

  handleShowFilter() {
    this._service.filterRequest.next();
  }

  handleSearchInputChange(event: Event) {
    const value: string = (event.target as HTMLInputElement).value;
    this._notifySearchValue(value || '');
  }

  handleExport() {
    this._service.exportRequest.next();
  }

  handleDeleteSelected() {
    this._service.deleteSelectedRequest.next();
  }

  handleSelectAll() {
    this._service.selectAllRequest.next();
  }

  handleSelectNone() {
    this._service.selectNoneRequest.next();
  }

  public get showButtons$(): Observable<boolean> {
    return this._service.addonVisible;
  }

  public get selectionMode$(): Observable<boolean> {
    return this._service.selectionMode$;
  }
}
