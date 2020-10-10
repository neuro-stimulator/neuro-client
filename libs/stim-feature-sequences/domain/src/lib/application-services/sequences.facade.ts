import { Injectable } from '@angular/core';

import { DefaultProjectorFn, MemoizedSelector, Store } from '@ngrx/store';

import { Sequence } from '@stechy1/diplomka-share';

import { BaseActions, BaseFacade } from '@diplomka-frontend/stim-lib-common';

import { SequencesState } from '../store/sequences.type';
import * as SequencesActions from '../store/sequences.actions';
import * as fromSequences from '../store/sequences.reducer';

@Injectable()
export class SequencesFacade extends BaseFacade<Sequence, SequencesState> {
  constructor(store: Store<SequencesState>) {
    super(store);
  }

  protected get baseActions(): BaseActions {
    return {
      allWithGhosts: {
        action: SequencesActions.actionSequencesAllWithGhostRequest,
      },
      all: { action: SequencesActions.actionSequencesAllRequest },
      one: {
        action: SequencesActions.actionSequencesOneRequest,
        parameterName: 'sequenceID',
      },
      insert: {
        action: SequencesActions.actionSequencesInsertRequest,
        parameterName: 'sequence',
      },
      update: {
        action: SequencesActions.actionSequencesUpdateRequest,
        parameterName: 'sequence',
      },
      delete: {
        action: SequencesActions.actionSequencesDeleteRequest,
        parameterName: 'sequenceID',
      },
      select: {
        action: SequencesActions.actionSequencesToggleSelected,
        parameterName: 'sequence',
      },
      selectAll: {
        action: SequencesActions.actionSequencesSelectAll,
      },
      selectNone: {
        action: SequencesActions.actionSequencesSelectNone,
      },
    };
  }

  protected get featureSelector(): MemoizedSelector<
    object,
    SequencesState,
    DefaultProjectorFn<SequencesState>
  > {
    return fromSequences.sequencesFeature;
  }

  public empty(emptySequence: Sequence) {
    this.store.dispatch(
      SequencesActions.actionSequenceEmpty({ emptySequence })
    );
  }

  public save(record: Sequence) {
    if (!record.id) {
      this.insert(record);
    } else {
      this.update(record);
    }
  }

  public nameExists(name: string) {
    this.store.dispatch(
      SequencesActions.actionSequencesNameExistsRequest({ name })
    );
  }

  public experimentsAsSequenceSource() {
    this.store.dispatch(
      SequencesActions.actionSequencesExperimentsAsSequenceSourceRequest({})
    );
  }

  public generateSequence(sequence: Sequence) {
    this.store.dispatch(
      SequencesActions.actionSequencesGenerateRequest({ sequence })
    );
  }

  public fromNameAndSize(experimentID: number, name: string, size: number) {
    this.store.dispatch(
      SequencesActions.actionSequencesInsertRequestFast({
        experimentID,
        name,
        size,
      })
    );
  }

  originalSequenceAsActual() {
    this.store.dispatch(SequencesActions.actionSequencesOriginalAsActual({}));
  }
}
