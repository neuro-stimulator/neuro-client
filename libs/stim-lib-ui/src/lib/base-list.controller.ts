import { Directive, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

import { EntityGroup, ListFilterParameters, ListGroupSortFilterService } from '@diplomka-frontend/stim-lib-list-utils';
import { ModalComponent } from '@diplomka-frontend/stim-lib-modal';
import { FilterDialogComponent } from '@diplomka-frontend/stim-lib-ui';

import { ListButtonsAddonService } from './list-buttons-addon/list-buttons-addon.service';
import { BaseFacade } from '@diplomka-frontend/stim-lib-common';
import { NavigationFacade } from '@diplomka-frontend/stim-feature-navigation/domain';
import { AliveCheckerFacade, ConnectionInformationState } from '@diplomka-frontend/stim-lib-connection';

@Directive()
export abstract class BaseListController<T, S> implements OnInit, OnDestroy {
  @ViewChild('modal', { static: true }) modal: ModalComponent;

  private _filterRequestSubscription: Subscription;
  // private _searchBySubscription: Subscription;
  private _filterParametersChangeSubscription: Subscription;
  private _serviceRecordsSubscription: Subscription;
  private _filterEntitiesSubscription: Subscription;
  private _selectionModeSubscription: Subscription;
  private _exportRequestSubscription: Subscription;
  private _selectAllRequestSubscription: Subscription;
  private _selectNoneRequestSubscription: Subscription;
  private _deleteSelectedRequestSubscription: Subscription;

  protected constructor(
    protected readonly _facade: BaseFacade<T, S>,
    private readonly _filterService: ListGroupSortFilterService<T>,
    private readonly _navigation: NavigationFacade,
    private readonly _connection: AliveCheckerFacade,
    private readonly _buttonsAddonService: ListButtonsAddonService,
    protected readonly _router: Router,
    protected readonly _route: ActivatedRoute,
    private readonly _location: Location
  ) {
  }

  get groups(): EntityGroup<T> {
    return this._filterService.records;
  }

  get hasGroups() {
    return (
      this.groups.length !== 0 &&
      Object.keys(this.groups[0]?.entities)?.length !== 0
    );
  }

  get state(): Observable<S> {
    return this._facade.state;
  }

  get connectionState(): Observable<ConnectionInformationState> {
    return this._connection.state;
  }

  protected abstract get introRecord(): T;

  protected abstract get filterDialogComponent(): Type<FilterDialogComponent<T>>;

  protected abstract get introStepsComponentName(): string;

  protected abstract get records$(): Observable<T[]>;

  protected abstract get selectionMode$(): Observable<boolean>;

  ngOnInit() {
    this._filterEntitiesSubscription = this._filterService.subscribeEntities(
      this.records$
    );
    this._facade.allWithGhosts();
    // this._buttonsAddonService.addonVisible.next(false);
    this._navigation.showAddon = false;
    this._serviceRecordsSubscription = this.records$.subscribe(
      (records: T[]) => {
        this._navigation.showAddon = records.length !== 0;
      }
    );
    // this.ghosts = this._service.makeGhosts();
    // this._filterEntitiesSubscription = this._filterService.subscribeEntities(this._service.records);
    // this._service.all()
    //     .then((count: number) => {
    //       this.ghosts = [];
    //       this._showIntro(count === 0);
    //     });
    this._filterRequestSubscription = this._buttonsAddonService.filterRequest.subscribe(
      () => this._showFilterDialog()
    );
    this._exportRequestSubscription = this._buttonsAddonService.exportRequest.subscribe(
      () => this._exportEntities()
    );
    this._deleteSelectedRequestSubscription = this._buttonsAddonService.deleteSelectedRequest.subscribe(
      () => this._deleteSelected()
    );
    this._selectAllRequestSubscription = this._buttonsAddonService.selectAllRequest.subscribe(
      () => this._selectAll()
    );
    this._selectNoneRequestSubscription = this._buttonsAddonService.selectNoneRequest.subscribe(
      () => this._selectNone()
    );

    // this._searchBySubscription = this._buttonsAddonService.searchValue.subscribe((value) => this._handleSearchBy(value));
    this._filterParametersChangeSubscription = this._filterService.filterParametersChange$.subscribe(
      (params: ListFilterParameters) => {
        this._handleFilterParametersChange(params);
      }
    );
    this._selectionModeSubscription = this.selectionMode$.subscribe(
      (selectionMode: boolean) => {
        this._buttonsAddonService.selectionMode$.next(selectionMode);
      }
    );
  }

  ngOnDestroy(): void {
    this._filterRequestSubscription.unsubscribe();
    //   this._searchBySubscription.unsubscribe();
    this._filterParametersChangeSubscription.unsubscribe();
    this._serviceRecordsSubscription.unsubscribe();
    this._filterEntitiesSubscription.unsubscribe();
    this._selectionModeSubscription.unsubscribe();
    this._exportRequestSubscription.unsubscribe();
    this._selectAllRequestSubscription.unsubscribe();
    this._selectNoneRequestSubscription.unsubscribe();
    this._deleteSelectedRequestSubscription.unsubscribe();
    // }
    //
    // private _showIntro(useIntroRecord: boolean) {
    //   this._intro.showIntro(this.introStepsComponentName, () => {
    //     if (useIntroRecord) {
    //       this._service.setIntroRecord(this.introRecord);
    //     }
    //   }, () => {
    //     if (useIntroRecord) {
    //       this._service.clearIntroRecord();
    //     }
    //   });
  }

  private _handleFilterParametersChange(params: ListFilterParameters) {
    this._router.navigate([], {
      queryParams: params,
      fragment: this._filterService.searchValue,
      relativeTo: this._route
    });
  }

  private _handleSearchBy(value: string) {
    const url = this._router.serializeUrl(
      this._router.createUrlTree([], {
        relativeTo: this._route,
        queryParams: this._filterService.filterParameters,
        fragment: value
      })
    );
    this._location.go(url);
    this._filterService.filterBy(value);
  }

  private _showFilterDialog() {
    this.modal.showComponent = this.filterDialogComponent;
    this.modal.open();
  }

  private _exportEntities() {
    // TODO implementovat export dialog
  }

  private _deleteSelected() {
    this._facade.deleteSelected();
  }

  private _selectAll() {
    this._facade.selectAll();
  }

  private _selectNone() {
    this._facade.selectNone();
  }
}
