import { Injectable } from '@angular/core';

import { DefaultProjectorFn, MemoizedSelector, Store } from '@ngrx/store';

import { ExperimentResult } from '@stechy1/diplomka-share';

import { BaseActions, BaseFacade } from '@diplomka-frontend/stim-lib-common';

import { ExperimentResultsState } from '../store/experiment-results.type';
import * as ExperimentResultsActions from '../store/experiment-results.actions';
import * as fromExperimentResults from '../store/experiment-results.reducer';

@Injectable()
export class ExperimentResultsFacade extends BaseFacade<
  ExperimentResult,
  ExperimentResultsState
> {
  constructor(store: Store<ExperimentResultsState>) {
    super(store);
  }

  protected get baseActions(): BaseActions {
    return {
      allWithGhosts: {
        action:
          ExperimentResultsActions.actionExperimentResultsAllWithGhostRequest,
      },
      all: {
        action: ExperimentResultsActions.actionExperimentResultsAllRequest,
      },
      one: {
        action: ExperimentResultsActions.actionExperimentResultsOneRequest,
        parameterName: 'experimentResultID',
      },
      insert: {
        action: undefined,
        parameterName: '',
      },
      update: {
        action: ExperimentResultsActions.actionExperimentResultsUpdateRequest,
        parameterName: 'experimentResult',
      },
      delete: {
        action: ExperimentResultsActions.actionExperimentResultsDeleteRequest,
        parameterName: 'experimentResultID',
      },
      select: {
        action: ExperimentResultsActions.actionExperimentResultsToggleSelected,
        parameterName: 'experimentResult',
      },
      selectAll: {
        action: ExperimentResultsActions.actionExperimentResultsSelectAll,
      },
      selectNone: {
        action: ExperimentResultsActions.actionExperimentResultsSelectNone,
      },
    };
  }

  public empty(emptyExperimentResult: ExperimentResult) {
    this.store.dispatch(
      ExperimentResultsActions.actionExperimentResultsEmpty({
        emptyExperimentResult,
      })
    );
  }

  public insert(record: ExperimentResult) {}

  public save(record: ExperimentResult) {
    if (record.id === undefined) {
      this.insert(record);
    } else {
      this.update(record);
    }
  }

  public nameExists(name: string) {
    this.store.dispatch(
      ExperimentResultsActions.actionExperimentResultsNameExistsRequest({
        name,
      })
    );
  }

  protected get featureSelector(): MemoizedSelector<
    object,
    ExperimentResultsState,
    DefaultProjectorFn<ExperimentResultsState>
  > {
    return fromExperimentResults.experimentResultsFeature;
  }
}
