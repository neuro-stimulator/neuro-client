import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Store } from "@ngrx/store";

import { ExperimentResult } from "@stechy1/diplomka-share";

import { BaseActions, BaseFacade } from "@diplomka-frontend/stim-lib-common";

import { ExperimentResultsState } from "../store/experiment-results.type";
import * as ExperimentResultsActions from '../store/experiment-results.actions';
import * as fromExperimentResults from '../store/experiment-results.reducer';

@Injectable()
export class ExperimentResultsFacade extends BaseFacade<ExperimentResult, ExperimentResultsState> {

  constructor(store: Store<ExperimentResultsState>) {
    super(store);
  }

  protected get baseActions(): BaseActions {
    return {
      allWithGhosts: { action: ExperimentResultsActions.actionExperimentResultsAllWithGhostRequest},
      all: { action: ExperimentResultsActions.actionExperimentResultsAllRequest},
      one: { action: ExperimentResultsActions.actionExperimentResultsOneRequest, parameterName: 'experimentResultID'},
      insert: { action: ExperimentResultsActions.actionExperimentResultsInsertRequest, parameterName: 'experimentResult'},
      update: { action: ExperimentResultsActions.actionExperimentResultsUpdateRequest, parameterName: 'experimentResult'},
      delete: { action: ExperimentResultsActions.actionExperimentResultsDeleteRequest, parameterName: 'experimentResultID'}
    }
  }

  public empty() {
    this.store.dispatch(ExperimentResultsActions.actionExperimentResultsEmpty({}));
  }

  public save(record: ExperimentResult) {
    if (record.id === undefined) {
      this.insert(record);
    } else {
      this.update(record);
    }
  }

  public nameExists(name: string) {
    this.store.dispatch(ExperimentResultsActions.actionExperimentResultsNameExistsRequest({ name }));
  }

  protected get stateKey(): string {
    return fromExperimentResults.experimentResultsReducerKey;
  }

}
