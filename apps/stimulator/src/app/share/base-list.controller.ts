import { OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Subscription } from 'rxjs';

import { EntityGroup, ListFilterParameters, ListGroupSortFilterService } from '@diplomka-frontend/stim-lib-list-utils';
import { ModalComponent } from '@diplomka-frontend/stim-lib-modal';
import { FilterDialogComponent } from "@diplomka-frontend/stim-lib-ui";

import { ListButtonsAddonService } from '../../../../../libs/stim-lib-ui/src/lib/list-buttons-addon/list-buttons-addon.service';
import { IntroService } from './intro.service';
import { BaseService } from './base-service';

export abstract class BaseListController<T> implements OnInit, OnDestroy {

  @ViewChild('modal', {static: true}) modal: ModalComponent;

  ghosts: any[] = [];

  private _filterRequestSubscription: Subscription;
  private _searchBySubscription: Subscription;
  private _filterParametersChangeSubscription: Subscription;
  private _serviceRecordsSubscription: Subscription;
  private _filterEntitiesSubscription: Subscription;

  protected constructor(protected readonly _service: BaseService<T>,
                        private readonly _filterService: ListGroupSortFilterService<T>,
                        private readonly _buttonsAddonService: ListButtonsAddonService,
                        protected readonly _router: Router,
                        protected readonly _route: ActivatedRoute,
                        private readonly _location: Location,
                        private readonly _intro: IntroService) {}

  ngOnInit() {
    this._buttonsAddonService.addonVisible.next(false);
    this.ghosts = this._service.makeGhosts();
    this._filterEntitiesSubscription = this._filterService.subscribeEntities(this._service.records);
    this._service.all()
        .then((count: number) => {
          this.ghosts = [];
          this._showIntro(count === 0);
        });
    this._filterRequestSubscription = this._buttonsAddonService.filterRequest.subscribe(() => this._showFilterDialog());
    this._searchBySubscription = this._buttonsAddonService.searchValue.subscribe((value) => this._handleSearchBy(value));
    this._filterParametersChangeSubscription = this._filterService.filterParametersChange$.subscribe((params: ListFilterParameters) => {
      this._handleFilterParametersChange(params);
    });
    this._serviceRecordsSubscription = this._service.records.subscribe((records) => {
      this._buttonsAddonService.addonVisible.next(records.length !== 0);
    });
  }

  ngOnDestroy(): void {
    this._filterRequestSubscription.unsubscribe();
    this._searchBySubscription.unsubscribe();
    this._filterParametersChangeSubscription.unsubscribe();
    this._serviceRecordsSubscription.unsubscribe();
    this._filterEntitiesSubscription.unsubscribe();
  }

  private _showIntro(useIntroRecord: boolean) {
    this._intro.showIntro(this.introStepsComponentName, () => {
      if (useIntroRecord) {
        this._service.setIntroRecord(this.introRecord);
      }
    }, () => {
      if (useIntroRecord) {
        this._service.clearIntroRecord();
      }
    });
  }

  private _handleFilterParametersChange(params: ListFilterParameters) {
    this._router.navigate([], {queryParams: params, fragment: this._filterService.searchValue, relativeTo: this._route});
  }

  private _handleSearchBy(value: string) {
    const url = this._router.serializeUrl(this._router.createUrlTree(
      [],
      {relativeTo: this._route, queryParams: this._filterService.filterParameters, fragment: value}
    ));
    this._location.go(url);
    this._filterService.filterBy(value);
  }

  private _showFilterDialog() {
    this.modal.showComponent = this.filterDialogComponent;
    this.modal.open();
  }

  protected abstract get introRecord(): T;

  protected abstract get filterDialogComponent(): Type<FilterDialogComponent<T>>;

  protected abstract get introStepsComponentName(): string;

  get groups(): EntityGroup<T> {
    return this._filterService.records;
  }

  get hasGroups() {
    return this._filterService.records && Object.keys(this._filterService.records[0]?.entities)?.length !== 0;
  }

}
