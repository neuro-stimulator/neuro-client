import { Component, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Subscription } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

import { Experiment, ExperimentType } from '@stechy1/diplomka-share';

import { ConfirmDialogComponent } from 'stim-lib-modal';
import { FabListEntry } from 'stim-lib-fab';
import { ListGroupSortFilterService } from 'stim-lib-list-utils';

import { IntroService } from '../share/intro.service';
import { ListButtonsAddonService } from '../share/list-buttons-addon/list-buttons-addon.service';
import { ExperimentsService } from './experiments.service';
import { BaseListController } from '../share/base-list.controller';
import { FilterDialogComponent } from '../share/filter-dialog/filter-dialog.component';
import { ExperimentsFilterDialogComponent } from './experiments-filter-dialog/experiments-filter-dialog.component';

@Component({
  selector: 'stim-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.sass']
})
export class ExperimentsComponent extends BaseListController<Experiment> {

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

  fabButtonList: FabListEntry[] = [
    {id: ExperimentType.REA, text: 'REA', class: 'rea', tooltip: 'REA'},
    {id: ExperimentType.TVEP, text: 'TVEP', class: 'tvep', tooltip: 'TVEP'},
    {id: ExperimentType.FVEP, text: 'FVEP', class: 'fvep', tooltip: 'FVEP'},
    {id: ExperimentType.CVEP, text: 'CVEP', class: 'cvep', tooltip: 'CVEP'},
    {id: ExperimentType.ERP, text: 'ERP', class: 'erp', tooltip: 'ERP'},
  ];


  constructor(service: ExperimentsService,
              filterService: ListGroupSortFilterService<Experiment>,
              buttonsAddonService: ListButtonsAddonService,
              router: Router,
              route: ActivatedRoute,
              location: Location,
              intro: IntroService,
              private readonly logger: NGXLogger) {
    super(service, filterService, buttonsAddonService, router, route, location, intro);
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

  protected get introRecord(): Experiment {
    return ExperimentsComponent.INTRO_EXPERIMENT;
  }

  protected get filterDialogComponent(): Type<FilterDialogComponent<Experiment>> {
    return ExperimentsFilterDialogComponent;
  }

  protected get introStepsComponentName(): string {
    return 'experiments-steps';
  }
}
