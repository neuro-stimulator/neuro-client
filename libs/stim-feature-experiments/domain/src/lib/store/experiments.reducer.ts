import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import { createEmptyExperiment, Experiment, Output } from '@stechy1/diplomka-share';

import { ExperimentsState } from './experiments.type';
import * as ExperimentsActions from './experiments.actions';
import * as fromAuth from '@neuro-client/stim-feature-auth/domain';

export const experimentsReducerKey = 'experiments';

const emptyExperiment: Experiment<Output> = createEmptyExperiment();

export function experimentsReducer(experimentsState: ExperimentsState, experimentsAction: Action) {
  return createReducer(
    {
      experiments: [],
      ghosts: [],
      selectedExperiment: {
        experiment: emptyExperiment,
        originalExperiment: emptyExperiment,
        nameExists: false,
        isNew: true,
        sequences: [],
      },
      groups: [],
      hasGroups: false,
      selectedExperiments: {},
      selectionMode: false,
      synchronizeOutputs: false,
    },
    on(ExperimentsActions.actionExperimentsAllRequest, (state: ExperimentsState) => ({
      ...state,
      working: true,
    })),
    on(ExperimentsActions.actionExperimentsAllWithGhostRequest, (state: ExperimentsState, action) => ({
      ...state,
      ghosts: new Array(action?.count || 5),
    })),
    on(ExperimentsActions.actionExperimentsAllRequestDone, (state: ExperimentsState, action) => ({
      ...state,
      experiments: action.experiments,
      selectedExperiment: {
        ...state.selectedExperiment,
        experiment: { ...state.selectedExperiment.experiment },
      },
      ghosts: [],
    })),
    on(ExperimentsActions.actionExperimentsAllRequestFail, (state: ExperimentsState) => ({
      ...state,
      experiments: [],
      ghosts: [],
    })),
    on(ExperimentsActions.actionExperimentEmpty, (state: ExperimentsState, action) => ({
      ...state,
      selectedExperiment: {
        ...state.selectedExperiment,
        experiment: { ...action.emptyExperiment },
        originalExperiment: { ...action.emptyExperiment },
        isNew: true,
        nameExists: false,
        sequences: [],
      },
    })),
    on(ExperimentsActions.actionExperimentsOneRequestDone, (state: ExperimentsState, action) => ({
      ...state,
      experiments: [...state.experiments],
      selectedExperiment: {
        ...state.selectedExperiment,
        experiment: { ...action.experiment },
        originalExperiment: { ...action.experiment },
        isNew: false,
        sequences: [],
      },
    })),

    on(ExperimentsActions.actionExperimentsInsertRequest, (state: ExperimentsState, action) => ({
      ...state,
      selectedExperiment: {
        ...state.selectedExperiment,
        experiment: { ...action.experiment },
        isNew: false,
      },
    })),
    on(ExperimentsActions.actionExperimentsInsertRequestDone, (state: ExperimentsState, action) => ({
      ...state,
      experiments: [...state.experiments, action.experiment],
      selectedExperiment: {
        ...state.selectedExperiment,
        originalExperiment: { ...action.experiment },
      },
    })),
    on(ExperimentsActions.actionExperimentsInsertRequestFail, (state: ExperimentsState) => ({
      ...state,
      selectedExperiment: {
        ...state.selectedExperiment,
        experiment: { ...state.selectedExperiment.originalExperiment },
      },
    })),
    on(ExperimentsActions.actionExperimentsUpdateRequest, (state: ExperimentsState, action) => ({
      ...state,
      selectedExperiment: {
        ...state.selectedExperiment,
        experiment: { ...action.experiment },
      },
    })),
    on(ExperimentsActions.actionExperimentsUpdateRequestDone, (state: ExperimentsState, action) => {
      const index = state.experiments.findIndex((experiment) => experiment.id === action.experiment.id);
      let data = [...state.experiments];
      if (index >= 0) {
        data = [...state.experiments.slice(0, index), action.experiment, ...state.experiments.slice(index + 1)];
      }
      return {
        ...state,
        experiments: data,
        selectedExperiment: {
          ...state.selectedExperiment,
          originalExperiment: { ...action.experiment },
        },
      };
    }),
    on(ExperimentsActions.actionExperimentsUpdateRequestFail, (state: ExperimentsState) => ({
      ...state,
      selectedExperiment: {
        ...state.selectedExperiment,
        experiment: { ...state.selectedExperiment.originalExperiment },
      },
    })),
    on(ExperimentsActions.actionExperimentsDeleteRequest, (state: ExperimentsState) => ({
      ...state,
      // working: true
    })),
    on(ExperimentsActions.actionExperimentsDeleteRequestDone, (state: ExperimentsState, action) => {
      const data = state.experiments.filter((experiment) => experiment.id !== action.experiment.id);
      const selectedExperiments = { ...state.selectedExperiments };
      delete selectedExperiments[action.experiment.id];
      let selectionMode = false;
      for (const selected of Object.values<boolean>(selectedExperiments)) {
        if (selected) {
          selectionMode = true;
          break;
        }
      }

      return {
        ...state,
        experiments: data,
        selectedExperiments,
        selectionMode,
      };
    }),

    on(ExperimentsActions.actionExperimentsNameExistsRequestDone, (state: ExperimentsState, action) => {
      return {
        ...state,
        selectedExperiment: {
          ...state.selectedExperiment,
          nameExists: action.exists,
        },
      };
    }),

    on(ExperimentsActions.actionSequencesForExperimentRequestDone, (state: ExperimentsState, action) => ({
      ...state,
      selectedExperiment: {
        ...state.selectedExperiment,
        sequences: action.sequences,
      },
    })),
    on(ExperimentsActions.actionExperimentsGenerateSequenceFromNameAndSizeRequestDone, (state: ExperimentsState, action) => ({
      ...state,
      selectedExperiment: {
        ...state.selectedExperiment,
        experiment: {
          ...state.selectedExperiment.experiment,
          sequenceId: action.sequence.id,
        },
        sequences: [...state.selectedExperiment.sequences, action.sequence],
      },
    })),
    on(ExperimentsActions.actionExperimentsToggleSelected, (state: ExperimentsState, action) => {
      let selectionMode = state.selectionMode;
      const selectedExperiments = { ...state.selectedExperiments };
      selectedExperiments[action.experiment.id] = selectedExperiments[action.experiment.id] ? false : true;
      if (selectedExperiments[action.experiment.id]) {
        selectionMode = true;
      } else {
        selectionMode = Object.values(selectedExperiments).reduce((previousValue, currentValue) => previousValue || currentValue);
      }

      return {
        ...state,
        selectedExperiments,
        selectionMode,
      };
    }),
    on(ExperimentsActions.actionExperimentsSelectAll, (state: ExperimentsState) => {
      const selectedExperiments = {};
      for (const experiment of state.experiments) {
        selectedExperiments[experiment.id] = true;
      }

      return {
        ...state,
        selectedExperiments,
      };
    }),
    on(ExperimentsActions.actionExperimentsSelectNone, (state: ExperimentsState) => {
      return {
        ...state,
        selectedExperiments: [],
        selectionMode: false,
      };
    }),

    on(ExperimentsActions.actionExperimentsSetOutputSynchronizationRequestDone, (state, action) => ({
      ...state,
      synchronizeOutputs: action.synchronize,
    })),
    on(fromAuth.actionLogoutRequestDone, (state, action) => ({
      ...state,
      experiments: [],
      selectedExperiment: {
        experiment: emptyExperiment,
        originalExperiment: emptyExperiment,
        nameExists: false,
        isNew: true,
        sequences: [],
      }
    }))
  )(experimentsState, experimentsAction);
}

export const experimentsFeature = createFeatureSelector<ExperimentsState>(experimentsReducerKey);

export const experimentsSelector = createSelector(experimentsFeature, (state: ExperimentsState) => state.experiments);
export const isNameValid = createSelector(experimentsFeature, (state: ExperimentsState) => state.selectedExperiment.nameExists);
export const synchronizeOutputsSelector = createSelector(experimentsFeature, (state: ExperimentsState) => state.synchronizeOutputs);
