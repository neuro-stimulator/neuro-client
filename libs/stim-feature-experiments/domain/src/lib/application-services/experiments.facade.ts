import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DefaultProjectorFn, MemoizedSelector, Store } from '@ngrx/store';

import { Experiment, Output } from '@stechy1/diplomka-share';

import { BaseActions, BaseFacade } from '@diplomka-frontend/stim-lib-common';
import * as fromConnection from '@diplomka-frontend/stim-lib-connection';

import * as ExperimentsActions from '../store/experiments.actions';
import * as fromExperiments from '../store/experiments.reducer';
import { ExperimentsState } from '../store/experiments.type';

@Injectable()
export class ExperimentsFacade extends BaseFacade<Experiment<Output>, ExperimentsState> {
  constructor(store: Store) {
    super(store);
  }

  protected get baseActions(): BaseActions {
    return {
      allWithGhosts: {
        action: ExperimentsActions.actionExperimentsAllWithGhostRequest,
      },
      all: { action: ExperimentsActions.actionExperimentsAllRequest },
      one: {
        action: ExperimentsActions.actionExperimentsOneRequest,
        parameterName: 'experimentID',
      },
      insert: {
        action: ExperimentsActions.actionExperimentsInsertRequest,
        parameterName: 'experiment',
      },
      update: {
        action: ExperimentsActions.actionExperimentsUpdateRequest,
        parameterName: 'experiment',
      },
      delete: {
        action: ExperimentsActions.actionExperimentsDeleteRequest,
        parameterName: 'experimentID',
      },
      select: {
        action: ExperimentsActions.actionExperimentsToggleSelected,
        parameterName: 'experiment',
      },
      selectAll: {
        action: ExperimentsActions.actionExperimentsSelectAll,
      },
      selectNone: {
        action: ExperimentsActions.actionExperimentsSelectNone,
      },
    };
  }

  public empty(emptyExperiment: Experiment<Output>) {
    this.store.dispatch(ExperimentsActions.actionExperimentEmpty({ emptyExperiment }));
  }

  public save(record: Experiment<Output>) {
    if (!record.id) {
      this.insert(record);
    } else {
      this.update(record);
    }
  }

  public nameExists(name: string) {
    this.store.dispatch(ExperimentsActions.actionExperimentsNameExistsRequest({ name }));
  }

  protected get featureSelector(): MemoizedSelector<Record<string, unknown>, ExperimentsState, DefaultProjectorFn<ExperimentsState>> {
    return fromExperiments.experimentsFeature;
  }

  get outputSynchronization(): Observable<boolean> {
    return this.store.select(fromExperiments.synchronizeOutputsSelector);
  }

  get ipcConnected(): Observable<boolean> {
    return this.store.select(fromConnection.ipcConnectedSelector);
  }

  generateSequenceFromNameAndSize(name: string, size: number) {
    this.store.dispatch(ExperimentsActions.actionExperimentsGenerateSequenceFromNameAndSizeRequest({ name, size }));
  }

  public setOutputSynchronization(synchronize: boolean) {
    this.store.dispatch(ExperimentsActions.actionExperimentsSetOutputSynchronizationRequest({ synchronize }));
  }
}
