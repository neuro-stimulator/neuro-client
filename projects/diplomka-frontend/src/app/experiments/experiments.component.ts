import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Subscription } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

import { Experiment, ExperimentType } from '@stechy1/diplomka-share';

import { ConfirmDialogComponent, ModalComponent } from 'stim-lib-modal';
import { FabListEntry } from 'stim-lib-fab';
import { EntityGroup, ListFilterParameters, ListGroupSortFilterService } from 'stim-lib-list-utils';

import { IntroService } from '../share/intro.service';
import { ListButtonsAddonService } from '../share/list-buttons-addon/list-buttons-addon.service';
import { ExperimentsService } from './experiments.service';
import { ExperimentsFilterDialogComponent } from './experiments-filter-dialog/experiments-filter-dialog.component';

@Component({
  selector: 'stim-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.sass']
})
export class ExperimentsComponent implements OnInit, OnDestroy {

  private static readonly INTRO_EXPERIMENT: Experiment = {
    id: -1,
    type: ExperimentType.NONE,
    name: 'Test',
    description: 'Test description',
    created: new Date().getTime(),
    outputCount: 1,
    usedOutputs: {led: true},
    tags: ['tag1', 'tag2']
  };

  @ViewChild('modal', {static: true}) modal: ModalComponent;

  ghosts: any[] = [];
  fabButtonList: FabListEntry[] = [
    {id: ExperimentType.REA, text: 'REA', class: 'rea', tooltip: 'REA'},
    {id: ExperimentType.TVEP, text: 'TVEP', class: 'tvep', tooltip: 'TVEP'},
    {id: ExperimentType.FVEP, text: 'FVEP', class: 'fvep', tooltip: 'FVEP'},
    {id: ExperimentType.CVEP, text: 'CVEP', class: 'cvep', tooltip: 'CVEP'},
    {id: ExperimentType.ERP, text: 'ERP', class: 'erp', tooltip: 'ERP'},
  ];

  private _filterRequestSubscription: Subscription;
  private _searchBySubscription: Subscription;
  private _filterParametersChangeSubscription: Subscription;
  private _serviceRecordsSubscription: Subscription;
  private _filterEntitiesSubscription: Subscription;

  constructor(private readonly _service: ExperimentsService,
              private readonly _filterService: ListGroupSortFilterService<Experiment>,
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
    this._intro.showIntro('experiments-steps', () => {
      if (useIntroRecord) {
        this._service.setIntroRecord(ExperimentsComponent.INTRO_EXPERIMENT);
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
    this.modal.showComponent = ExperimentsFilterDialogComponent;
    this.modal.open();
  }

  handleEdit(experiment: Experiment) {
    const type = ExperimentType[experiment.type].toLowerCase();
    this._router.navigate([type, experiment.id], {relativeTo: this._route.parent});
  }

  handleRun(experiment: Experiment) {
    const type = ExperimentType[experiment.type].toLowerCase();
    this._router.navigate(['/', 'player', type, experiment.id], {relativeTo: null});
  }

  handleSimulate(experiment: Experiment) {
    const type = ExperimentType[experiment.type].toLowerCase();
    this._router.navigate(['/', 'simulation', type, experiment.id], {relativeTo: null});
  }

  handleDelete(experiment: Experiment) {
    const self = this;
    this.modal.showComponent = ConfirmDialogComponent;
    this.modal.open({
      message: 'EXPERIMENTS.DIALOGS.DELETE.QUESTION',
      confirm: () => {
        self.logger.info(`Budu mazat experiment s id: ${experiment.id}.`);
        return self._service.delete(experiment.id);
      }
    });
  }

  handleNewExperiment(experimentType: ExperimentType) {
    const type: string = ExperimentType[experimentType].toLowerCase();
    this.logger.info(`Budu vytvářet nový experiment typu: ${type}.`);
    this._router.navigate([type, 'new'], {relativeTo: this._route.parent}).catch(((reason) => console.log(reason)));
  }

  get experimentGroups(): EntityGroup<Experiment> {
    return this._filterService.records;
  }

  get hasExperiments() {
    return this._filterService.records && Object.keys(this._filterService.records[0]?.entities)?.length !== 0;
  }
}
