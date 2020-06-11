import { Action, createReducer, on } from "@ngrx/store";

import * as SequencesActions from "./sequences.actions";
import { SequencesState } from "./sequences.type";

export const sequencesReducerKey = "sequences";

export function sequencesReducer(sequencesState: SequencesState, sequencesAction: Action) {
  return createReducer(
    {
      sequences: [],
      ghosts: [],
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
    },
    on(SequencesActions.actionSequencesAllRequestDone,
      SequencesActions.actionSequencesForExperimentRequestDone, (state: SequencesState, action) => ({
        ...state,
        sequences: action.sequences,
        selectedSequence: {
          ...state.selectedSequence,
          sequence: { ...state.selectedSequence.sequence }
        },
        working: false
      })),
    on(SequencesActions.actionSequencesOneRequestDone, (state: SequencesState, action) => ({
      ...state,
      sequences: [...state.sequences],
      selectedSequence: {
        ...state.selectedSequence,
        sequence: { ...action.sequence }
      },
      working: false
    })),

    on(SequencesActions.actionSequencesInsertRequestDone, (state: SequencesState, action) => ({
      ...state,
      sequences: [...state.sequences, action.sequence],
      selectedSequence: {
        ...state.selectedSequence,
        sequence: { ...action.sequence },
        isNew: false
      },
      working: false
    })),
    on(SequencesActions.actionSequencesUpdateRequestDone, (state: SequencesState, action) => {
      const index = state.sequences
                         .findIndex(sequence => sequence.id === action.sequence.id);
      if (index >= 0) {
        const data = [
          ...state.sequences.slice(0, index),
          action.sequence,
          ...state.sequences.slice(index + 1)
        ];

        return ({
          ...state,
          sequences: data,
          selectedSequence: {
            ...state.selectedSequence,
            sequence: { ...action.sequence }
          },
          working: false
        });
      }

      return state;
    }),
    on(SequencesActions.actionSequencesDeleteRequestDone, (state: SequencesState, action) => {
      const data = state.sequences.filter(sequence => sequence.id !== action.sequence.id);

      return ({
        ...state,
        sequences: data,
        working: false
      });

    }),

    on(SequencesActions.actionSequencesNameExistsRequestDone, (state: SequencesState, action) => {
      return ({
        ...state,
        selectedSequence: {
          ...state.selectedSequence,
          nameExists: action.exists
        },
        working: false
      });

    }),

    on(SequencesActions.actionSequencesGenerateDone, (state: SequencesState, action) => {
      return ({
        ...state,
        selectedSequence: {
          ...state.selectedSequence,
          data: [...action.sequenceData]
        },
        working: false
      });

    }),
    on(SequencesActions.actionSequencesExperimentsAsSequenceSourceRequestDone, (state: SequencesState, action) => {
      return ({
        ...state,
        selectedSequence: {
          ...state.selectedSequence,
          experiments: [...action.experiments]
        },
        working: false
      });
    })
  )(sequencesState, sequencesAction);
}
