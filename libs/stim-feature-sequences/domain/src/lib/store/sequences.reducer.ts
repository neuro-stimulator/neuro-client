import { Action, createReducer, createSelector, on } from '@ngrx/store';

import { createEmptySequence, Sequence } from '@stechy1/diplomka-share';

import { SequencesState } from './sequences.type';
import * as SequencesActions from './sequences.actions';

export const sequencesReducerKey = 'sequences';

const emptySequence: Sequence = createEmptySequence();

export function sequencesReducer(
  sequencesState: SequencesState,
  sequencesAction: Action
) {
  return createReducer(
    {
      sequences: [],
      ghosts: [],
      selectedSequence: {
        sequence: emptySequence,
        originalSequence: emptySequence,
        nameExists: false,
        isNew: true,
        experiments: [],
      },
      groups: [],
      hasGroups: false,
    },
    on(
      SequencesActions.actionSequencesAllRequest,
      (state: SequencesState, action) => ({
        ...state,
        working: true,
      })
    ),
    on(
      SequencesActions.actionSequencesAllWithGhostRequest,
      (state: SequencesState, action) => ({
        ...state,
        ghosts: new Array(action?.count || 5),
      })
    ),
    on(
      SequencesActions.actionSequencesAllRequestDone,
      (state: SequencesState, action) => ({
        ...state,
        sequences: action.sequences,
        selectedSequence: {
          ...state.selectedSequence,
          sequence: { ...state.selectedSequence.sequence },
        },
        ghosts: [],
      })
    ),
    on(
      SequencesActions.actionSequencesAllRequestFail,
      (state: SequencesState, action) => ({
        ...state,
        sequences: [],
        ghosts: [],
      })
    ),
    on(
      SequencesActions.actionSequenceEmpty,
      (state: SequencesState, action) => ({
        ...state,
        selectedSequence: {
          ...state.selectedSequence,
          sequence: { ...action.emptySequence },
          originalSequence: { ...action.emptySequence },
          isNew: true,
        },
      })
    ),
    on(
      SequencesActions.actionSequencesOneRequestDone,
      (state: SequencesState, action) => ({
        ...state,
        sequences: [...state.sequences],
        selectedSequence: {
          ...state.selectedSequence,
          sequence: { ...action.sequence },
          originalSequence: { ...action.sequence },
          isNew: false,
        },
      })
    ),

    on(
      SequencesActions.actionSequencesInsertRequest,
      (state: SequencesState, action) => ({
        ...state,
        selectedSequence: {
          ...state.selectedSequence,
          sequence: { ...action.sequence },
          isNew: false,
        },
      })
    ),
    on(
      SequencesActions.actionSequencesInsertRequestDone,
      (state: SequencesState, action) => ({
        ...state,
        sequences: [...state.sequences, action.sequence],
        selectedSequence: {
          ...state.selectedSequence,
          originalSequence: { ...action.sequence },
        },
      })
    ),
    on(
      SequencesActions.actionSequencesInsertRequestFail,
      (state: SequencesState, action) => ({
        ...state,
        selectedSequence: {
          ...state.selectedSequence,
          sequence: { ...state.selectedSequence.originalSequence },
        },
      })
    ),
    on(
      SequencesActions.actionSequencesUpdateRequest,
      (state: SequencesState, action) => ({
        ...state,
        selectedSequence: {
          ...state.selectedSequence,
          sequence: { ...action.sequence },
        },
      })
    ),
    on(
      SequencesActions.actionSequencesUpdateRequestDone,
      (state: SequencesState, action) => {
        const index = state.sequences.findIndex(
          (sequence) => sequence.id === action.sequence.id
        );
        let data = [...state.sequences];
        if (index >= 0) {
          data = [
            ...state.sequences.slice(0, index),
            action.sequence,
            ...state.sequences.slice(index + 1),
          ];
        }
        return {
          ...state,
          sequences: data,
          selectedSequence: {
            ...state.selectedSequence,
            originalSequence: { ...action.sequence },
          },
        };
      }
    ),
    on(
      SequencesActions.actionSequencesUpdateRequestFail,
      (state: SequencesState, action) => ({
        ...state,
        selectedSequence: {
          ...state.selectedSequence,
          sequence: { ...state.selectedSequence.originalSequence },
        },
      })
    ),
    on(
      SequencesActions.actionSequencesDeleteRequest,
      (state: SequencesState, action) => ({
        ...state,
        // working: true
      })
    ),
    on(
      SequencesActions.actionSequencesDeleteRequestDone,
      (state: SequencesState, action) => {
        const data = state.sequences.filter(
          (sequence) => sequence.id !== action.sequence.id
        );

        return {
          ...state,
          sequences: data,
        };
      }
    ),

    on(
      SequencesActions.actionSequencesNameExistsRequestDone,
      (state: SequencesState, action) => {
        return {
          ...state,
          selectedSequence: {
            ...state.selectedSequence,
            nameExists: action.exists,
          },
        };
      }
    ),
    // Sequence specific actions

    on(
      SequencesActions.actionSequencesGenerateRequest,
      (state: SequencesState, action) => ({
        ...state,
        selectedSequence: {
          ...state.selectedSequence,
          sequence: action.sequence,
        },
      })
    ),
    on(
      SequencesActions.actionSequencesGenerateDone,
      (state: SequencesState, action) => ({
        ...state,
        selectedSequence: {
          ...state.selectedSequence,
          sequence: {
            ...state.selectedSequence.sequence,
            data: action.sequenceData,
          },
        },
      })
    ),
    on(
      SequencesActions.actionSequencesExperimentsAsSequenceSourceRequestDone,
      (state: SequencesState, action) => ({
        ...state,
        selectedSequence: {
          ...state.selectedSequence,
          experiments: action.experiments,
        },
      })
    ),
    on(
      SequencesActions.actionSequencesOriginalAsActual,
      (state: SequencesState, action) => ({
        ...state,
        selectedSequence: {
          ...state.selectedSequence,
          sequence: { ...state.selectedSequence.originalSequence },
        },
      })
    )
    // on(
    //   SequencesActions.actionSequencesForExperimentRequestDone,
    //   (state: SequencesState, action) => ({})
    // )
  )(sequencesState, sequencesAction);
}
