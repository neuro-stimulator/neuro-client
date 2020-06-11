import { Action, createReducer, on } from '@ngrx/store';

import { ExperimentsState } from './experiments.type';
import * as ExperimentsActions from './experiments.actions';
import { createEmptyExperiment, Experiment } from '@stechy1/diplomka-share';

export const experimentsReducerKey = 'experiments';

const emptyExperiment: Experiment = createEmptyExperiment();

export function experimentsReducer(experimentsState: ExperimentsState, experimentsAction: Action) {
  return createReducer(
    {
      experiments: [],
      ghosts: [],
      selectedExperiment: {
        experiment: emptyExperiment,
        originalExperiment: emptyExperiment,
        nameExists: false,
        isNew: true
      },
      groups: [],
      hasGroups: false,
      working: true
    },
    on(ExperimentsActions.actionExperimentsAllRequest, (state: ExperimentsState, action) => ({
      ...state,
      working: true
    })),
    on(ExperimentsActions.actionExperimentsAllWithGhostRequest, (state: ExperimentsState, action) => ({
      ...state,
      working: true,
      ghosts: new Array(action?.count || 5)
    })),
    on(ExperimentsActions.actionExperimentsAllRequestDone, (state: ExperimentsState, action) => ({
      ...state,
      experiments: action.experiments,
      selectedExperiment: {
        ...state.selectedExperiment,
        experiment: {...state.selectedExperiment.experiment}
      },
      ghosts: [],
      working: false
    })),
    on(ExperimentsActions.actionExperimentEmpty, (state: ExperimentsState, action) => ({
      ...state,
      selectedExperiment: {
        ...state.selectedExperiment,
        experiment: {...action.emptyExperiment},
        isNew: true
      },
      working: false
    })),
    on(ExperimentsActions.actionExperimentsOneRequestDone, (state: ExperimentsState, action) => ({
      ...state,
      experiments: [...state.experiments],
      selectedExperiment: {
        ...state.selectedExperiment,
        experiment: {...action.experiment},
        originalExperiment: {...action.experiment},
        isNew: false
      },
      working: false
    })),

    on(ExperimentsActions.actionExperimentsInsertRequest, (state: ExperimentsState, action) => ({
      ...state,
      selectedExperiment: {
        ...state.selectedExperiment,
        experiment: {...action.experiment},
        isNew: false
      },
      working: true
    })),
    on(ExperimentsActions.actionExperimentsInsertRequestDone, (state: ExperimentsState, action) => ({
      ...state,
      experiments: [...state.experiments, action.experiment],
      selectedExperiment: {
        ...state.selectedExperiment,
        originalExperiment: {...action.experiment}
      },
      working: false
    })),
    on(ExperimentsActions.actionExperimentsInsertRequestFail, (state: ExperimentsState, action) => ({
      ...state,
      selectedExperiment: {
        ...state.selectedExperiment,
        experiment: {...state.selectedExperiment.originalExperiment}
      },
      working: false
    })),
    on(ExperimentsActions.actionExperimentsUpdateRequest, (state: ExperimentsState, action) => ({
      ...state,
      selectedExperiment: {
        ...state.selectedExperiment,
        experiment: {...action.experiment},
      },
      working: true
    })),
    on(ExperimentsActions.actionExperimentsUpdateRequestDone, (state: ExperimentsState, action) => {
      const index = state.experiments
                         .findIndex(experiment => experiment.id === action.experiment.id);
      let data = [...state.experiments];
      if (index >= 0) {
        data = [
          ...state.experiments.slice(0, index),
          action.experiment,
          ...state.experiments.slice(index + 1)
        ];
      }
        return ({
          ...state,
          experiments: data,
          selectedExperiment: {
            ...state.selectedExperiment,
            originalExperiment: {...action.experiment}
          },
          working: false
        });
    }),
    on(ExperimentsActions.actionExperimentsUpdateRequestFail, (state: ExperimentsState, action) => ({
      ...state,
      selectedExperiment: {
        ...state.selectedExperiment,
        experiment: {...state.selectedExperiment.originalExperiment}
      },
      working: false
    })),
    on(ExperimentsActions.actionExperimentsDeleteRequest, (state: ExperimentsState, action) => ({
      ...state,
      working: true
    })),
    on(ExperimentsActions.actionExperimentsDeleteRequestDone, (state: ExperimentsState, action) => {
      const data = state.experiments.filter(experiment => experiment.id !== action.experiment.id);

      return ({
        ...state,
        experiments: data,
        working: false
      });

    }),

    on(ExperimentsActions.actionExperimentsNameExistsRequestDone, (state: ExperimentsState, action) => {
      return ({
        ...state,
        selectedExperiment: {
          ...state.selectedExperiment,
          nameExists: action.exists
        },
        working: false
      });

    }),
  )(experimentsState, experimentsAction);
}
