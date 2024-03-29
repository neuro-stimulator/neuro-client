import { Component, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NGXLogger } from 'ngx-logger';

import { ExperimentResult, ExperimentType } from '@stechy1/diplomka-share';

import { ConfirmDialogArgs, ConfirmDialogComponent } from '@neuro-client/stim-lib-modal';
import { ListGroupSortFilterService } from '@neuro-client/stim-lib-list-utils';
import { FilterDialogComponent } from '@neuro-client/stim-lib-ui';
import { ExperimentResultsFacade, ExperimentResultsState } from '@neuro-client/stim-feature-experiment-results/domain';
import { BaseListComponent } from '@neuro-client/stim-lib-ui';
import { ListButtonsAddonService } from '@neuro-client/stim-lib-ui';
import { NavigationFacade } from '@neuro-client/stim-feature-navigation/domain';
import { AliveCheckerFacade } from '@neuro-client/stim-lib-connection';

import { ExperimentResultsFilterDialogComponent } from './experiment-results-filter-dialog/experiment-results-filter-dialog.component';

@Component({
  templateUrl: './experiment-results.component.html',
  styleUrls: ['./experiment-results.component.sass'],
})
export class ExperimentResultsComponent extends BaseListComponent<ExperimentResult, ExperimentResultsState> {
  private static readonly INTRO_EXPERIMENT_RESULT: ExperimentResult = {
    id: -1,
    experimentID: -1,
    name: 'Test',
    type: ExperimentType.NONE,
    date: new Date().getTime(),
    outputCount: 1,
    filename: '',
  };

  constructor(
    service: ExperimentResultsFacade,
    filterService: ListGroupSortFilterService<ExperimentResult>,
    navigation: NavigationFacade,
    connection: AliveCheckerFacade,
    buttonsAddonService: ListButtonsAddonService,
    router: Router,
    route: ActivatedRoute,
    location: Location,
    private readonly logger: NGXLogger
  ) {
    super(service, filterService, navigation, connection, buttonsAddonService, router, route, location);
  }

  handleView(experimentResult: ExperimentResult) {
    this._router.navigate([experimentResult.id], {
      relativeTo: this._route.parent,
    });
  }

  handleDelete(experimentResult: ExperimentResult) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    this.modal.showComponent = ConfirmDialogComponent;
    this.modal.open<ConfirmDialogArgs>({
      message: 'EXPERIMENT_RESULTS.DIALOGS.DELETE.QUESTION',
      confirm: () => {
        self.logger.info(`Budu mazat výsledek experimentu s id: ${experimentResult.id}.`);
        return self._facade.delete(experimentResult.id);
      },
    });
  }

  handleSelect(experimentResult: ExperimentResult) {
    this._facade.selectEntity(experimentResult);
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

  protected get records$(): Observable<ExperimentResult[]> {
    return this.state.pipe(map((state: ExperimentResultsState) => state.experimentResults));
  }

  protected get selectionMode$(): Observable<boolean> {
    return this.state.pipe(map((state: ExperimentResultsState) => state.selectionMode));
  }
}
