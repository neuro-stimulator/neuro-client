import { Component, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { NGXLogger } from 'ngx-logger';

import { ExperimentResult, ExperimentType } from '@stechy1/diplomka-share';

import { ConfirmDialogComponent } from '@diplomka-frontend/stim-lib-modal';
import { ListGroupSortFilterService } from '@diplomka-frontend/stim-lib-list-utils';
import { FilterDialogComponent } from "@diplomka-frontend/stim-lib-ui";
import { ExperimentResultsFacade } from "@diplomka-frontend/stim-feature-experiment-results/domain";
import { BaseListController } from "@diplomka-frontend/stim-lib-ui";
import { ListButtonsAddonService } from "@diplomka-frontend/stim-lib-ui";

import { ExperimentResultsFilterDialogComponent } from './experiment-results-filter-dialog/experiment-results-filter-dialog.component';

@Component({
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

  constructor(service: ExperimentResultsFacade,
              filterService: ListGroupSortFilterService<ExperimentResult>,
              buttonsAddonService: ListButtonsAddonService,
              router: Router,
              route: ActivatedRoute,
              location: Location,
              private readonly logger: NGXLogger) {
    super(service, filterService, buttonsAddonService, router, route, location);
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
