import { Component, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { NGXLogger } from 'ngx-logger';

import { ExperimentResult, ExperimentType } from '@stechy1/diplomka-share';

import { ConfirmDialogComponent} from 'stim-lib-modal';
import { ListGroupSortFilterService } from 'stim-lib-list-utils';

import { IntroService } from '../share/intro.service';
import { BaseListController } from '../share/base-list.controller';
import { ListButtonsAddonService } from '../share/list-buttons-addon/list-buttons-addon.service';
import { ExperimentResultsService } from './experiment-results.service';
import { FilterDialogComponent } from '../share/filter-dialog/filter-dialog.component';
import { ExperimentResultsFilterDialogComponent } from './experiment-results-filter-dialog/experiment-results-filter-dialog.component';

@Component({
  selector: 'stim-experiment-results',
  templateUrl: './experiment-results.component.html',
  styleUrls: ['./experiment-results.component.sass']
})
export class ExperimentResultsComponent extends BaseListController<ExperimentResult> {

  private static readonly INTRO_EXPERIMENT_RESULT: ExperimentResult = {
    id: -1,
    experimentID: -1,
    name: 'Test',
    type: ExperimentType.NONE,
    date: new Date().getTime(),
    outputCount: 1,
    filename: ''
  };

  constructor(service: ExperimentResultsService,
              filterService: ListGroupSortFilterService<ExperimentResult>,
              buttonsAddonService: ListButtonsAddonService,
              router: Router,
              route: ActivatedRoute,
              location: Location,
              intro: IntroService,
              private readonly logger: NGXLogger) {
    super(service, filterService, buttonsAddonService, router, route, location, intro);
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

  protected get introRecord(): ExperimentResult {
    return ExperimentResultsComponent.INTRO_EXPERIMENT_RESULT;
  }

  protected get filterDialogComponent(): Type<FilterDialogComponent<ExperimentResult>> {
    return ExperimentResultsFilterDialogComponent;
  }

  protected get introStepsComponentName(): string {
    return 'experiment-results-steps';
  }
}
