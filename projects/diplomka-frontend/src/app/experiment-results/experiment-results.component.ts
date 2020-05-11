import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Subscription } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

import { ExperimentResult, ExperimentType } from '@stechy1/diplomka-share';

import { ConfirmDialogComponent, ModalComponent } from 'stim-lib-modal';
import { EntityGroup, ListFilterParameters, ListGroupSortFilterService } from 'stim-lib-list-utils';

import { IntroService } from '../share/intro.service';
import { ListButtonsAddonService } from '../share/list-buttons-addon/list-buttons-addon.service';
import { ExperimentResultsService } from './experiment-results.service';
import { ExperimentResultsFilterDialogComponent } from './experiment-results-filter-dialog/experiment-results-filter-dialog.component';

@Component({
  selector: 'stim-experiment-results',
  templateUrl: './experiment-results.component.html',
  styleUrls: ['./experiment-results.component.sass']
})
export class ExperimentResultsComponent implements OnInit, OnDestroy {

  private static readonly INTRO_EXPERIMENT_RESULT: ExperimentResult = {
    id: -1,
    experimentID: -1,
    name: 'Test',
    type: ExperimentType.NONE,
    date: new Date().getTime(),
    outputCount: 1,
    filename: ''
  };

  @ViewChild('modal', {static: true}) modal: ModalComponent;

  ghosts: any[] = [];

  private _filterRequestSubscription: Subscription;
  private _searchBySubscription: Subscription;
  private _filterParametersChangeSubscription: Subscription;
  private _serviceRecordsSubscription: Subscription;
  private _filterEntitiesSubscription: Subscription;

  constructor(private readonly _service: ExperimentResultsService,
              private readonly _filterService: ListGroupSortFilterService<ExperimentResult>,
              private readonly _buttonsAddonService: ListButtonsAddonService,
              private readonly _router: Router,
              private readonly _route: ActivatedRoute,
              private readonly _location: Location,
              private readonly _intro: IntroService,
              private readonly logger: NGXLogger) {}

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
    this._serviceRecordsSubscription = this._service.records.subscribe((records: ExperimentResult[]) => {
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
    this._intro.showIntro('experiment-results-steps', () => {
      if (useIntroRecord) {
        this._service.setIntroRecord(ExperimentResultsComponent.INTRO_EXPERIMENT_RESULT);
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
    this.modal.showComponent = ExperimentResultsFilterDialogComponent;
    this.modal.open();
  }

  handleView(experimentResult: ExperimentResult) {
    this._router.navigate([experimentResult.id], {relativeTo: this._route.parent});
  }

  handleDelete(experimentResult: ExperimentResult) {
    const self = this;
    this.modal.showComponent = ConfirmDialogComponent;
    this.modal.open({
      message: 'EXPERIMENT_RESULTS.DIALOGS.DELETE.QUESTION',
      confirm: () => {
        self.logger.info(`Budu mazat výsledek experimentu s id: ${experimentResult.id}.`);
        return self._service.delete(experimentResult.id);
      }
    });
  }

  get experimentResultGroups(): EntityGroup<ExperimentResult> {
    return this._filterService.records;
  }

  get hasExperimentResults() {
    return this._filterService.records && Object.keys(this._filterService.records[0]?.entities)?.length !== 0;
  }
}
