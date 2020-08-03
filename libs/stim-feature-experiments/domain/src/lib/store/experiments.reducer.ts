import { Action, createReducer, createSelector, on } from '@ngrx/store';

import { createEmptyExperiment, Experiment } from '@stechy1/diplomka-share';

import { ExperimentsState } from './experiments.type';
import * as ExperimentsActions from './experiments.actions';

export const experimentsReducerKey = 'experiments';

const emptyExperiment: Experiment = createEmptyExperiment();

export function experimentsReducer(
  experimentsState: ExperimentsState,
  experimentsAction: Action
) {
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
    },
    on(
      ExperimentsActions.actionExperimentsAllRequest,
      (state: ExperimentsState, action) => ({
        ...state,
        working: true,
      })
    ),
    on(
      ExperimentsActions.actionExperimentsAllWithGhostRequest,
      (state: ExperimentsState, action) => ({
        ...state,
        ghosts: new Array(action?.count || 5),
      })
    ),
    on(
      ExperimentsActions.actionExperimentsAllRequestDone,
      (state: ExperimentsState, action) => ({
        ...state,
        experiments: action.experiments,
        selectedExperiment: {
          ...state.selectedExperiment,
          experiment: { ...state.selectedExperiment.experiment },
        },
        ghosts: [],
      })
    ),
    on(
      ExperimentsActions.actionExperimentsAllRequestFail,
      (state: ExperimentsState, action) => ({
        ...state,
        experiments: [],
        ghosts: [],
      })
    ),
    on(
      ExperimentsActions.actionExperimentEmpty,
      (state: ExperimentsState, action) => ({
        ...state,
        selectedExperiment: {
          ...state.selectedExperiment,
          experiment: { ...action.emptyExperiment },
          originalExperiment: { ...action.emptyExperiment },
          isNew: true,
          nameExists: false,
          sequences: [],
        },
      })
    ),
    on(
      ExperimentsActions.actionExperimentsOneRequestDone,
      (state: ExperimentsState, action) => ({
        ...state,
        experiments: [...state.experiments],
        selectedExperiment: {
          ...state.selectedExperiment,
          experiment: { ...action.experiment },
          originalExperiment: { ...action.experiment },
          isNew: false,
          sequences: [],
        },
      })
    ),

    on(
      ExperimentsActions.actionExperimentsInsertRequest,
      (state: ExperimentsState, action) => ({
        ...state,
        selectedExperiment: {
          ...state.selectedExperiment,
          experiment: { ...action.experiment },
          isNew: false,
        },
      })
    ),
    on(
      ExperimentsActions.actionExperimentsInsertRequestDone,
      (state: ExperimentsState, action) => ({
        ...state,
        experiments: [...state.experiments, action.experiment],
        selectedExperiment: {
          ...state.selectedExperiment,
          originalExperiment: { ...action.experiment },
        },
      })
    ),
    on(
      ExperimentsActions.actionExperimentsInsertRequestFail,
      (state: ExperimentsState, action) => ({
        ...state,
        selectedExperiment: {
          ...state.selectedExperiment,
          experiment: { ...state.selectedExperiment.originalExperiment },
        },
      })
    ),
    on(
      ExperimentsActions.actionExperimentsUpdateRequest,
      (state: ExperimentsState, action) => ({
        ...state,
        selectedExperiment: {
          ...state.selectedExperiment,
          experiment: { ...action.experiment },
        },
      })
    ),
    on(
      ExperimentsActions.actionExperimentsUpdateRequestDone,
      (state: ExperimentsState, action) => {
        const index = state.experiments.findIndex(
          (experiment) => experiment.id === action.experiment.id
        );
        let data = [...state.experiments];
        if (index >= 0) {
          data = [
            ...state.experiments.slice(0, index),
            action.experiment,
            ...state.experiments.slice(index + 1),
          ];
        }
        return {
          ...state,
          experiments: data,
          selectedExperiment: {
            ...state.selectedExperiment,
            originalExperiment: { ...action.experiment },
          },
        };
      }
    ),
    on(
      ExperimentsActions.actionExperimentsUpdateRequestFail,
      (state: ExperimentsState, action) => ({
        ...state,
        selectedExperiment: {
          ...state.selectedExperiment,
          experiment: { ...state.selectedExperiment.originalExperiment },
        },
      })
    ),
    on(
      ExperimentsActions.actionExperimentsDeleteRequest,
      (state: ExperimentsState, action) => ({
        ...state,
        // working: true
      })
    ),
    on(
      ExperimentsActions.actionExperimentsDeleteRequestDone,
      (state: ExperimentsState, action) => {
        const data = state.experiments.filter(
          (experiment) => experiment.id !== action.experiment.id
        );

        return {
          ...state,
          experiments: data,
        };
      }
    ),

    on(
      ExperimentsActions.actionExperimentsNameExistsRequestDone,
      (state: ExperimentsState, action) => {
        return {
          ...state,
          selectedExperiment: {
            ...state.selectedExperiment,
            nameExists: action.exists,
          },
        };
      }
    ),

    on(
      ExperimentsActions.actionSequencesForExperimentRequestDone,
      (state: ExperimentsState, action) => ({
        ...state,
        selectedExperiment: {
          ...state.selectedExperiment,
          sequences: action.sequences,
        },
      })
    ),
    on(
      ExperimentsActions.actionExperimentsGenerateSequenceFromNameAndSizeRequestDone,
      (state: ExperimentsState, action) => ({
        ...state,
        selectedExperiment: {
          ...state.selectedExperiment,
          experiment: {
            ...state.selectedExperiment.experiment,
            sequenceId: action.sequence.id,
          },
          sequences: [...state.selectedExperiment.sequences, action.sequence],
        },
      })
    )
  )(experimentsState, experimentsAction);
}

export const getExperimentsState = (state) => state.experiments;

export const isNameValid: any = createSelector(
  getExperimentsState,
  (state: ExperimentsState) => state.selectedExperiment.nameExists
);