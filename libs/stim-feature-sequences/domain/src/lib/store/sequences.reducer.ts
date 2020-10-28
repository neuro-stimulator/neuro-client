import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import { createEmptyExperiment, createEmptySequence, Experiment, Output, Sequence } from '@stechy1/diplomka-share';

import { SequencesState } from './sequences.type';
import * as SequencesActions from './sequences.actions';

export const sequencesReducerKey = 'sequences';

const emptySequence: Sequence = createEmptySequence();
const emptyExperiment: Experiment<Output> = createEmptyExperiment();

export function sequencesReducer(sequencesState: SequencesState, sequencesAction: Action) {
  function getExperiment(state: SequencesState): Experiment<Output> {
    const experimentID = state.selectedSequence.sequence.experimentId;
    if (experimentID === -1) {
      return emptyExperiment;
    }

    const index = state.selectedSequence.experiments.findIndex((value: Experiment<Output>) => value.id === +experimentID);
    if (index === -1) {
      return emptyExperiment;
    }

    return state.selectedSequence.experiments[index];
  }

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
        experiment: emptyExperiment,
      },
      groups: [],
      hasGroups: false,
      selectedSequences: {},
      selectionMode: false,
    },
    on(SequencesActions.actionSequencesAllRequest, (state: SequencesState) => ({
      ...state,
      working: true,
    })),
    on(SequencesActions.actionSequencesAllWithGhostRequest, (state: SequencesState, action) => ({
      ...state,
      ghosts: new Array(action?.count || 5),
    })),
    on(SequencesActions.actionSequencesAllRequestDone, (state: SequencesState, action) => ({
      ...state,
      sequences: action.sequences,
      selectedSequence: {
        ...state.selectedSequence,
        sequence: { ...state.selectedSequence.sequence },
      },
      ghosts: [],
    })),
    on(SequencesActions.actionSequencesAllRequestFail, (state: SequencesState) => ({
      ...state,
      sequences: [],
      ghosts: [],
    })),
    on(SequencesActions.actionSequenceEmpty, (state: SequencesState, action) => ({
      ...state,
      selectedSequence: {
        ...state.selectedSequence,
        sequence: { ...action.emptySequence },
        originalSequence: { ...action.emptySequence },
        isNew: true,
      },
    })),
    on(SequencesActions.actionSequencesOneRequestDone, (state: SequencesState, action) => ({
      ...state,
      sequences: [...state.sequences],
      selectedSequence: {
        ...state.selectedSequence,
        sequence: { ...action.sequence },
        originalSequence: { ...action.sequence },
        isNew: false,
      },
    })),

    on(SequencesActions.actionSequencesInsertRequest, (state: SequencesState, action) => ({
      ...state,
      selectedSequence: {
        ...state.selectedSequence,
        sequence: { ...action.sequence },
        isNew: false,
      },
    })),
    on(SequencesActions.actionSequencesInsertRequestDone, (state: SequencesState, action) => ({
      ...state,
      sequences: [...state.sequences, action.sequence],
      selectedSequence: {
        ...state.selectedSequence,
        originalSequence: { ...action.sequence },
      },
    })),
    on(SequencesActions.actionSequencesInsertRequestFail, (state: SequencesState) => ({
      ...state,
      selectedSequence: {
        ...state.selectedSequence,
        sequence: { ...state.selectedSequence.originalSequence },
      },
    })),
    on(SequencesActions.actionSequencesUpdateRequest, (state: SequencesState, action) => ({
      ...state,
      selectedSequence: {
        ...state.selectedSequence,
        sequence: { ...action.sequence },
      },
    })),
    on(SequencesActions.actionSequencesUpdateRequestDone, (state: SequencesState, action) => {
      const index = state.sequences.findIndex((sequence) => sequence.id === action.sequence.id);
      let data = [...state.sequences];
      if (index >= 0) {
        data = [...state.sequences.slice(0, index), action.sequence, ...state.sequences.slice(index + 1)];
      }
      return {
        ...state,
        sequences: data,
        selectedSequence: {
          ...state.selectedSequence,
          originalSequence: { ...action.sequence },
        },
      };
    }),
    on(SequencesActions.actionSequencesUpdateRequestFail, (state: SequencesState) => ({
      ...state,
      selectedSequence: {
        ...state.selectedSequence,
        sequence: { ...state.selectedSequence.originalSequence },
      },
    })),
    on(SequencesActions.actionSequencesDeleteRequest, (state: SequencesState) => ({
      ...state,
      // working: true
    })),
    on(SequencesActions.actionSequencesDeleteRequestDone, (state: SequencesState, action) => {
      const data = state.sequences.filter((sequence) => sequence.id !== action.sequence.id);
      const selectedSequences = { ...state.selectedSequences };
      delete selectedSequences[action.sequence.id];
      let selectionMode = false;
      for (const selected of Object.values<boolean>(selectedSequences)) {
        if (selected) {
          selectionMode = true;
          break;
        }
      }

      return {
        ...state,
        sequences: data,
        selectedSequences,
        selectionMode,
      };
    }),

    on(SequencesActions.actionSequencesNameExistsRequestDone, (state: SequencesState, action) => {
      return {
        ...state,
        selectedSequence: {
          ...state.selectedSequence,
          nameExists: action.exists,
        },
      };
    }),
    // Sequence specific actions

    on(SequencesActions.actionSequencesGenerateRequest, (state: SequencesState, action) => ({
      ...state,
      selectedSequence: {
        ...state.selectedSequence,
        sequence: action.sequence,
      },
    })),
    on(SequencesActions.actionSequencesGenerateDone, (state: SequencesState, action) => ({
      ...state,
      selectedSequence: {
        ...state.selectedSequence,
        sequence: {
          ...state.selectedSequence.sequence,
          data: action.sequenceData,
        },
      },
    })),
    on(SequencesActions.actionSequencesExperimentsAsSequenceSourceRequestDone, (state: SequencesState, action) => ({
      ...state,
      selectedSequence: {
        ...state.selectedSequence,
        experiments: action.experiments,
      },
    })),
    on(SequencesActions.actionSequencesOriginalAsActual, (state: SequencesState) => ({
      ...state,
      selectedSequence: {
        ...state.selectedSequence,
        sequence: { ...state.selectedSequence.originalSequence },
      },
    })),
    on(SequencesActions.actionSequencesUpdateSelectedExperiment, (state: SequencesState) => ({
      ...state,
      selectedSequence: {
        ...state.selectedSequence,
        experiment: getExperiment(state),
      },
    })),

    on(SequencesActions.actionSequencesToggleSelected, (state: SequencesState, action) => {
      let selectionMode = state.selectionMode;
      const selectedSequences = { ...state.selectedSequences };
      selectedSequences[action.sequence.id] = selectedSequences[action.sequence.id] ? false : true;
      if (selectedSequences[action.sequence.id]) {
        selectionMode = true;
      } else {
        selectionMode = Object.values(selectedSequences).reduce((previousValue, currentValue) => previousValue || currentValue);
      }

      return {
        ...state,
        selectedSequences,
        selectionMode,
      };
    }),
    on(SequencesActions.actionSequencesSelectAll, (state: SequencesState) => {
      const selectedSequences = {};
      for (const sequence of state.sequences) {
        selectedSequences[sequence.id] = true;
      }

      return {
        ...state,
        selectedSequences,
      };
    }),
    on(SequencesActions.actionSequencesSelectNone, (state: SequencesState) => {
      return {
        ...state,
        selectedSequences: [],
        selectionMode: false,
      };
    })
  )(sequencesState, sequencesAction);
}

export const sequencesFeature = createFeatureSelector<SequencesState>(sequencesReducerKey);

export const sequencesSelector = createSelector(sequencesFeature, (state: SequencesState) => state.sequences);
