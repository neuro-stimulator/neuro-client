import { Action, createReducer, on } from "@ngrx/store";

import { ExperimentResultsState } from "./experiment-results.type";
import * as ExperimentResultsActions from "./experiment-results.actions";
import { createEmptyExperiment, createEmptyExperimentResult } from "@stechy1/diplomka-share";

export const experimentResultsReducerKey = "experimentResults";

export function experimentResultsReducer(experimentResultsState: ExperimentResultsState, experimentResultsAction: Action) {
  return createReducer(
    {
      experimentResults: [],
      ghosts: [],
      selectedExperimentResult: {
        experimentResult: null,
        nameExists: false,
        isNew: true
      },
      groups: [],
      hasGroups: false
    },
    on(ExperimentResultsActions.actionExperimentResultsAllRequestDone, (state: ExperimentResultsState, action) => ({
      ...state,
      experimentResults: action.experimentResults,
      selectedExperimentResult: {
        ...state.selectedExperimentResult,
        experimentResult: { ...state.selectedExperimentResult.experimentResult }
      }
    })),
    on(ExperimentResultsActions.actionExperimentResultsEmpty, (state: ExperimentResultsState, action) => ({
      ...state,
      selectedExperimentResult: {
        ...state.selectedExperimentResult,
        experimentResult: createEmptyExperimentResult(createEmptyExperiment()),
        isNew: true
      }
    })),
    on(ExperimentResultsActions.actionExperimentResultsOneRequestDone, (state: ExperimentResultsState, action) => ({
      ...state,
      experimentResults: [...state.experimentResults],
      selectedExperimentResult: {
        ...state.selectedExperimentResult,
        experimentResult: { ...action.experimentResult }
      }
    })),

    on(ExperimentResultsActions.actionExperimentResultsInsertRequestDone, (state: ExperimentResultsState, action) => ({
      ...state,
      experimentResults: [...state.experimentResults, action.experimentResult],
      selectedExperimentResult: {
        ...state.selectedExperimentResult,
        experimentResult: { ...action.experimentResult },
        isNew: false
      }
    })),
    on(ExperimentResultsActions.actionExperimentResultsUpdateRequestDone, (state: ExperimentResultsState, action) => {
      const index = state.experimentResults
                         .findIndex(experiment => experiment.id === action.experimentResult.id);
      if (index >= 0) {
        const data = [
          ...state.experimentResults.slice(0, index),
          action.experimentResult,
          ...state.experimentResults.slice(index + 1)
        ];

        return ({
          ...state,
          experimentResults: data,
          selectedExperimentResult: {
            ...state.selectedExperimentResult,
            experimentResult: { ...action.experimentResult }
          }
        });
      }

      return state;
    }),
    on(ExperimentResultsActions.actionExperimentResultsDeleteRequestDone, (state: ExperimentResultsState, action) => {
      const data = state.experimentResults.filter(experiment => experiment.id !== action.experimentResult.id);

      return ({
        ...state,
        experimentResults: {
          ...state.experimentResults,
          experimentResults: data
        }
      });

    }),

    on(ExperimentResultsActions.actionExperimentResultsNameExistsRequestDone, (state: ExperimentResultsState, action) => {
      return ({
        ...state,
        experimentResults: {
          ...state.experimentResults,
          selectedExperimentResult: {
            ...state.selectedExperimentResult,
            nameExists: action.exists
          }
        }
      });

    })
  )(experimentResultsState, experimentResultsAction);
}
