import { Action, createReducer, on } from "@ngrx/store";

import { ExperimentsState } from "./experiments.type";
import * as ExperimentsActions from './experiments.actions';

export const experimentsReducerKey = 'experiments';

export function experimentsReducer(experimentsState: ExperimentsState, experimentsAction: Action) {
  return createReducer(
    {
        experiments: [],
        selectedExperiment: {
          experiment: null,
          nameExists: false,
          isNew: true
        },
        groups: [],
        hasGroups: false,
        working: false
    },
    on(ExperimentsActions.actionExperimentsAllRequestDone, (state: ExperimentsState, action) => ({
      ...state,
        experiments: action.experiments,
        selectedExperiment: {
          ...state.selectedExperiment,
          experiment: {...state.selectedExperiment.experiment }
        },
        working: false
    })),
    on(ExperimentsActions.actionExperimentEmpty, (state: ExperimentsState, action) => ({
      ...state,
        ...state.experiments,
        selectedExperiment: {
          ...state.selectedExperiment,
          experiment: {...action.emptyExperiment},
          isNew: true
        },
        working: false
    })),
    on(ExperimentsActions.actionExperimentsOneRequestDone, (state: ExperimentsState, action) => ({
      ...state,
        ...state.experiments,
        experiments: [...state.experiments],
        selectedExperiment: {
          ...state.selectedExperiment,
          experiment: {...action.experiment}
        },
        working: false
    })),

    on(ExperimentsActions.actionExperimentsInsertRequestDone, (state: ExperimentsState, action) => ({
      ...state,
        ...state.experiments,
        experiments: [...state.experiments, action.experiment],
        selectedExperiment: {
          ...state.selectedExperiment,
          experiment: {...action.experiment},
          isNew: false
        },
        working: false
    })),
    on(ExperimentsActions.actionExperimentsUpdateRequestDone, (state: ExperimentsState, action) => {
      const index = state.experiments
                         .findIndex(experiment => experiment.id === action.experiment.id);
      if (index >= 0) {
        const data = [
          ...state.experiments.slice(0, index),
          action.experiment,
          ...state.experiments.slice(index + 1)
        ];

        return ({
          ...state,
            ...state.experiments,
            experiments: data,
            selectedExperiment: {
              ...state.selectedExperiment,
              experiment: {...action.experiment}
            },
            working: false
        });
      }

      return state;
    }),
    on(ExperimentsActions.actionExperimentsDeleteRequestDone, (state: ExperimentsState, action) => {
      const data = state.experiments.filter(experiment => experiment.id !== action.experiment.id);

      return ({
        ...state,
          ...state.experiments,
          experiments: data,
          working: false
      });

    }),

    on(ExperimentsActions.actionExperimentsNameExistsRequestDone, (state: ExperimentsState, action) => {
      return ({
        ...state,
          ...state.experiments,
          selectedExperiment: {
            ...state.selectedExperiment,
            nameExists: action.exists
          },
          working: false
      });

    }),
  )(experimentsState, experimentsAction);
}
