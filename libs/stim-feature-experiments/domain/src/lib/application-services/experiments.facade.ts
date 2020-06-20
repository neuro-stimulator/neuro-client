import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";

import { Experiment } from "@stechy1/diplomka-share";

import { BaseFacade } from "@diplomka-frontend/stim-lib-common";
import { BaseActions } from "@diplomka-frontend/stim-lib-common";

import * as ExperimentsActions from '../store/experiments.actions';
import * as fromExperiments from '../store/experiments.reducer';
import { ExperimentsState } from "../store/experiments.type";

@Injectable()
export class ExperimentsFacade extends BaseFacade<Experiment, ExperimentsState> {

  constructor(store: Store<ExperimentsState>) {
    super(store);
  }

  protected get baseActions(): BaseActions {
    return {
      allWithGhosts: { action: ExperimentsActions.actionExperimentsAllWithGhostRequest},
      all: { action: ExperimentsActions.actionExperimentsAllRequest},
      one: { action: ExperimentsActions.actionExperimentsOneRequest, parameterName: 'experimentID'},
      insert: { action: ExperimentsActions.actionExperimentsInsertRequest, parameterName: 'experiment'},
      update: { action: ExperimentsActions.actionExperimentsUpdateRequest, parameterName: 'experiment'},
      delete: { action: ExperimentsActions.actionExperimentsDeleteRequest, parameterName: 'experimentID'}
    }
  }

  public empty(emptyExperiment: Experiment) {
    this.store.dispatch(ExperimentsActions.actionExperimentEmpty({ emptyExperiment }));
  }

  public save(record: Experiment) {
    if (!record.id) {
      this.insert(record);
    } else {
      this.update(record);
    }
  }

  public nameExists(name: string) {
    this.store.dispatch(ExperimentsActions.actionExperimentsNameExistsRequest({ name }));
  }

  protected get stateKey(): string {
    return fromExperiments.experimentsReducerKey;
  }
}