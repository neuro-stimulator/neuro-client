import { Action, createReducer, on } from "@ngrx/store";

import * as SequencesActions from './sequences.actions';
import { SequencesState } from "./sequences.type";

export const sequencesReducerKey = 'sequencesReducerKey';

export function sequencesReducer(sequencesState: SequencesState, sequencesAction: Action) {
  return createReducer(
    {
      sequences: {
        sequences: [],
        selectedSequence: {
          sequence: null,
          nameExists: false,
          isNew: true,
          data: [],
          experiments: []
        },
        groups: [],
        hasGroups: false,
        working: false
      }
    },
    on(SequencesActions.actionSequencesAllRequestDone,
      SequencesActions.actionSequencesForExperimentRequestDone, (state: SequencesState, action) => ({
      ...state,
      sequences: {
        ...state.sequences,
        sequences: action.sequences,
        selectedSequence: {
          ...state.sequences.selectedSequence,
          sequence: {...state.sequences.selectedSequence.sequence }
        },
        working: false
      }
    })),
    on(SequencesActions.actionSequencesOneRequestDone, (state: SequencesState, action) => ({
      ...state,
      sequences: {
        ...state.sequences,
        sequences: [...state.sequences.sequences],
        selectedSequence: {
          ...state.sequences.selectedSequence,
          sequence: {...action.sequence}
        },
        working: false
      }
    })),

    on(SequencesActions.actionSequencesInsertRequestDone, (state: SequencesState, action) => ({
      ...state,
      sequences: {
        ...state.sequences,
        sequences: [...state.sequences.sequences, action.sequence],
        selectedSequence: {
          ...state.sequences.selectedSequence,
          sequence: {...action.sequence},
          isNew: false
        },
        working: false
      }
    })),
    on(SequencesActions.actionSequencesUpdateRequestDone, (state: SequencesState, action) => {
      const index = state.sequences.sequences
                         .findIndex(sequence => sequence.id === action.sequence.id);
      if (index >= 0) {
        const data = [
          ...state.sequences.sequences.slice(0, index),
          action.sequence,
          ...state.sequences.sequences.slice(index + 1)
        ];

        return ({
          ...state,
          sequences: {
            ...state.sequences,
            sequences: data,
            selectedSequence: {
              ...state.sequences.selectedSequence,
              sequence: {...action.sequence}
            },
            working: false
          }
        });
      }

      return state;
    }),
    on(SequencesActions.actionSequencesDeleteRequestDone, (state: SequencesState, action) => {
      const data = state.sequences.sequences.filter(sequence => sequence.id !== action.sequence.id);

      return ({
        ...state,
        sequences: {
          ...state.sequences,
          sequences: data,
          working: false
        }
      });

    }),

    on(SequencesActions.actionSequencesNameExistsRequestDone, (state: SequencesState, action) => {
      return ({
        ...state,
        sequences: {
          ...state.sequences,
          selectedSequence: {
            ...state.sequences.selectedSequence,
            nameExists: action.exists
          },
          working: false
        }
      });

    }),

    on(SequencesActions.actionSequencesGenerateDone, (state: SequencesState, action) => {
      return ({
        ...state,
        sequences: {
          ...state.sequences,
          selectedSequence: {
            ...state.sequences.selectedSequence,
            data: [...action.sequenceData]
          },
          working: false
        }
      });

    }),
    on(SequencesActions.actionSequencesExperimentsAsSequenceSourceRequestDone, (state: SequencesState, action) => {
      return ({
        ...state,
        sequences: {
          ...state.sequences,
          selectedSequence: {
            ...state.sequences.selectedSequence,
            experiments: [...action.experiments]
          },
          working: false
        }
      });
    })
  )(sequencesState, sequencesAction);
}
