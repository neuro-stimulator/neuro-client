import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

import { Experiment, ExperimentType } from '@stechy1/diplomka-share';

import { ModalComponent } from '../share/modal/modal.component';
import { FabListEntry } from '../share/fab/fab-list-entry';
import { ConfirmDialogComponent } from '../share/modal/confirm/confirm-dialog.component';
import { ExperimentsButtonsAddonService } from '../share/buttons-addons/experiments-buttons-addon/experiments-buttons-addon.service';
import { ExperimentsService } from './experiments.service';
import { ExperimentsSortFilter } from './experiments-sort-filter.service';
import { ExperimentFilterDialogComponent } from './experiment-filter-dialog/experiment-filter-dialog.component';
import { FilterParameters } from './experiments-filter-parameters';
import { Location } from '@angular/common';
import { ExperimentGroup } from './experiments.share';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.sass']
})
export class ExperimentsComponent implements OnInit, OnDestroy {

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

  constructor(private readonly _service: ExperimentsService,
              private readonly _filterService: ExperimentsSortFilter,
              private readonly _buttonsAddonService: ExperimentsButtonsAddonService,
              private readonly _router: Router,
              private readonly _route: ActivatedRoute,
              private readonly _location: Location,
              private readonly logger: NGXLogger) {}

  ngOnInit() {
    this.ghosts = this._service.makeGhosts();
    this._service.all()
        .then(() => {
          this.ghosts = [];
        });
    this._filterRequestSubscription = this._buttonsAddonService.filterRequest.subscribe(() => this._showFilterDialog());
    this._searchBySubscription = this._buttonsAddonService.searchValue.subscribe(value => this._handleSearchBy(value));
    this._filterParametersChangeSubscription = this._filterService.filterParametersChange$.subscribe(params => this._handleFilterParametersChange(params));
  }

  ngOnDestroy(): void {
    this._filterRequestSubscription.unsubscribe();
    this._searchBySubscription.unsubscribe();
    this._filterParametersChangeSubscription.unsubscribe();
  }

  private _handleFilterParametersChange(params: FilterParameters) {
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
    this.modal.showComponent = ExperimentFilterDialogComponent;
    this.modal.open();
  }

  handleEdit(experiment: Experiment) {
    const type = ExperimentType[experiment.type].toLowerCase();
    this._router.navigate([type, experiment.id], {relativeTo: this._route});
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
      message: 'Opravdu si přejete smazat vybraný experiment?',
      confirm: () => {
        self.logger.info(`Budu mazat experiment s id: ${experiment.id}.`);
        return self._service.delete(experiment.id);
      }
    });
  }

  handleNewExperiment(experimentType: ExperimentType) {
    const type: string = ExperimentType[experimentType].toLowerCase();
    this.logger.info(`Budu vytvářet nový experiment typu: ${type}.`);
    this._router.navigate([type, 'new'], {relativeTo: this._route});
  }

  get experimentGroups(): ExperimentGroup {
    return this._filterService.records;
  }

  get hasExperiments() {
    return this._filterService.records && Object.keys(this._filterService.records).length !== 0;
  }
}
