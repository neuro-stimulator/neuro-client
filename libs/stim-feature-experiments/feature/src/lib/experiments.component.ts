import { Component, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { NGXLogger } from 'ngx-logger';

import { Experiment, ExperimentType, Output } from '@stechy1/diplomka-share';

import { ConfirmDialogArgs, ConfirmDialogComponent } from '@neuro-client/stim-lib-modal';
import { FabListEntry } from '@neuro-client/stim-lib-fab';
import { ListGroupSortFilterService } from '@neuro-client/stim-lib-list-utils';
import { BaseListComponent, FilterDialogComponent, ListButtonsAddonService } from '@neuro-client/stim-lib-ui';
import { ExperimentsFacade, ExperimentsState } from '@neuro-client/stim-feature-experiments/domain';

import { ExperimentsFilterDialogComponent } from './experiments-filter-dialog/experiments-filter-dialog.component';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NavigationFacade } from '@neuro-client/stim-feature-navigation/domain';
import { AliveCheckerFacade } from '@neuro-client/stim-lib-connection';
import { AuthFacade, AuthState } from '@neuro-client/stim-feature-auth/domain';

@Component({
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.sass'],
})
export class ExperimentsComponent extends BaseListComponent<Experiment<Output>, ExperimentsState> {
  private static readonly INTRO_EXPERIMENT: Experiment<Output> = {
    id: -1,
    type: ExperimentType.NONE,
    name: 'Test',
    description: 'Test description',
    created: new Date().getTime(),
    outputCount: 1,
    usedOutputs: { led: true },
    tags: ['tag1', 'tag2'],
    supportSequences: false,
    outputs: [],
  };

  fabButtonList: FabListEntry[] = [
    { id: ExperimentType.REA, text: 'REA', class: 'rea', tooltip: 'REA' },
    { id: ExperimentType.TVEP, text: 'TVEP', class: 'tvep', tooltip: 'TVEP' },
    { id: ExperimentType.FVEP, text: 'FVEP', class: 'fvep', tooltip: 'FVEP' },
    { id: ExperimentType.CVEP, text: 'CVEP', class: 'cvep', tooltip: 'CVEP' },
    { id: ExperimentType.ERP, text: 'ERP', class: 'erp', tooltip: 'ERP' },
  ];

  constructor(
    service: ExperimentsFacade,
    filterService: ListGroupSortFilterService<Experiment<Output>>,
    navigation: NavigationFacade,
    connection: AliveCheckerFacade,
    buttonsAddonService: ListButtonsAddonService,
    router: Router,
    route: ActivatedRoute,
    location: Location,
    private readonly auth: AuthFacade,
    private readonly logger: NGXLogger
  ) {
    super(service, filterService, navigation, connection, buttonsAddonService, router, route, location);
  }

  handleEdit(experiment: Experiment<Output>) {
    const type = ExperimentType[experiment.type].toLowerCase();
    this._router.navigate([type, experiment.id], {
      relativeTo: this._route.parent,
    });
  }

  handleRun(experiment: Experiment<Output>) {
    const type = ExperimentType[experiment.type].toLowerCase();
    this._router.navigate(['/', 'player', type, experiment.id], {
      relativeTo: null,
    });
  }

  handleSimulate(experiment: Experiment<Output>) {
    const type = ExperimentType[experiment.type].toLowerCase();
    this._router.navigate(['/', 'simulation', type, experiment.id], {
      relativeTo: null,
    });
  }

  handleDelete(experiment: Experiment<Output>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    this.modal.showComponent = ConfirmDialogComponent;
    this.modal.open<ConfirmDialogArgs>({
      message: 'EXPERIMENTS.DIALOGS.DELETE.QUESTION',
      confirm: () => {
        self.logger.info(`Budu mazat experiment s id: ${experiment.id}.`);
        self._facade.delete(experiment.id);
      },
    });
  }

  handleNewExperiment(experimentType: ExperimentType) {
    const type: string = ExperimentType[experimentType].toLowerCase();
    this.logger.info(`Budu vytvářet nový experiment typu: ${type}.`);
    this._router.navigate([type, 'new'], { relativeTo: this._route.parent }).catch((reason) => console.log(reason));
  }

  handleSelect(experiment: Experiment<Output>) {
    this._facade.selectEntity(experiment);
  }

  protected get introRecord(): Experiment<Output> {
    return ExperimentsComponent.INTRO_EXPERIMENT;
  }

  protected get filterDialogComponent(): Type<FilterDialogComponent<Experiment<Output>>> {
    return ExperimentsFilterDialogComponent;
  }

  protected get introStepsComponentName(): string {
    return 'experiments-steps';
  }

  protected get records$(): Observable<Experiment<Output>[]> {
    return this.state.pipe(map((state: ExperimentsState) => state.experiments));
  }

  protected get selectionMode$(): Observable<boolean> {
    return this.state.pipe(map((state: ExperimentsState) => state.selectionMode));
  }

  get isAuthenticated(): Observable<boolean> {
    return this.auth.state.pipe(map((state: AuthState) => state.isAuthenticated));
  }
}
