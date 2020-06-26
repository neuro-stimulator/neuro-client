import { Action, createReducer, on } from '@ngrx/store';

import { ExperimentResultsState } from './experiment-results.type';
import * as ExperimentResultsActions from './experiment-results.actions';
import {
  createEmptyExperiment,
  createEmptyExperimentResult,
  ExperimentResult,
} from '@stechy1/diplomka-share';

export const experimentResultsReducerKey = 'experimentResults';

const emptyExperimentResult: ExperimentResult = createEmptyExperimentResult(
  createEmptyExperiment()
);

export function experimentResultsReducer(
  experimentResultsState: ExperimentResultsState,
  experimentResultsAction: Action
) {
  return createReducer(
    {
      experimentResults: [],
      ghosts: [],
      selectedExperimentResult: {
        experimentResult: emptyExperimentResult,
        originalExperimentResult: emptyExperimentResult,
        data: [],
        nameExists: false,
        isNew: true,
      },
      groups: [],
      hasGroups: false,
    },
    on(
      ExperimentResultsActions.actionExperimentResultsAllRequest,
      (state: ExperimentResultsState, action) => ({
        ...state,
        working: true,
      })
    ),
    on(
      ExperimentResultsActions.actionExperimentResultsAllWithGhostRequest,
      (state: ExperimentResultsState, action) => ({
        ...state,
        ghosts: new Array(action?.count || 5),
      })
    ),
    on(
      ExperimentResultsActions.actionExperimentResultsAllRequestDone,
      (state: ExperimentResultsState, action) => ({
        ...state,
        experimentResults: action.experimentResults,
        selectedExperimentResult: {
          ...state.selectedExperimentResult,
          experimentResult: {
            ...state.selectedExperimentResult.experimentResult,
          },
        },
        ghosts: [],
      })
    ),
    on(
      ExperimentResultsActions.actionExperimentResultsAllRequestFail,
      (state: ExperimentResultsState, action) => ({
        ...state,
        experimentResults: [],
        ghosts: [],
      })
    ),
    on(
      ExperimentResultsActions.actionExperimentResultsEmpty,
      (state: ExperimentResultsState, action) => ({
        ...state,
        selectedExperimentResult: {
          ...state.selectedExperimentResult,
          experiment: { ...action.emptyExperimentResult },
          isNew: true,
        },
      })
    ),
    on(
      ExperimentResultsActions.actionExperimentResultsOneRequestDone,
      (state: ExperimentResultsState, action) => ({
        ...state,
        experimentResults: [...state.experimentResults],
        selectedExperimentResult: {
          ...state.selectedExperimentResult,
          experimentResult: { ...action.experimentResult },
          originalExperimentResult: { ...action.experimentResult },
          isNew: false,
        },
      })
    ),

    on(
      ExperimentResultsActions.actionExperimentResultsDataDone,
      (state: ExperimentResultsState, action) => ({
        ...state,
        selectedExperimentResult: {
          ...state.selectedExperimentResult,
          data: action.data,
        },
      })
    ),

    on(
      ExperimentResultsActions.actionExperimentResultsInsertRequest,
      (state: ExperimentResultsState, action) => ({
        ...state,
        selectedExperimentResult: {
          ...state.selectedExperimentResult,
          experiment: { ...action.experimentResult },
          isNew: false,
        },
      })
    ),
    on(
      ExperimentResultsActions.actionExperimentResultsInsertRequestDone,
      (state: ExperimentResultsState, action) => ({
        ...state,
        experimentResults: [
          ...state.experimentResults,
          action.experimentResult,
        ],
        selectedExperimentResult: {
          ...state.selectedExperimentResult,
          originalExperimentResult: { ...action.experimentResult },
        },
      })
    ),
    on(
      ExperimentResultsActions.actionExperimentResultsInsertRequestFail,
      (state: ExperimentResultsState, action) => ({
        ...state,
        selectedExperimentResult: {
          ...state.selectedExperimentResult,
          experimentResult: {
            ...state.selectedExperimentResult.originalExperimentResult,
          },
        },
      })
    ),
    on(
      ExperimentResultsActions.actionExperimentResultsUpdateRequest,
      (state: ExperimentResultsState, action) => ({
        ...state,
        selectedExperimentResult: {
          ...state.selectedExperimentResult,
          experimentResult: { ...action.experimentResult },
        },
      })
    ),
    on(
      ExperimentResultsActions.actionExperimentResultsUpdateRequestDone,
      (state: ExperimentResultsState, action) => {
        const index = state.experimentResults.findIndex(
          (experimentResult: ExperimentResult) =>
            experimentResult.id === action.experimentResult.id
        );
        let data = [...state.experimentResults];
        if (index >= 0) {
          data = [
            ...state.experimentResults.slice(0, index),
            action.experimentResult,
            ...state.experimentResults.slice(index + 1),
          ];
        }
        return {
          ...state,
          experimentResults: data,
          selectedExperimentResult: {
            ...state.selectedExperimentResult,
            originalExperimentResult: { ...action.experimentResult },
          },
        };
      }
    ),
    on(
      ExperimentResultsActions.actionExperimentResultsUpdateRequestFail,
      (state: ExperimentResultsState, action) => ({
        ...state,
        selectedExperimentResult: {
          ...state.selectedExperimentResult,
          experimentResult: {
            ...state.selectedExperimentResult.originalExperimentResult,
          },
        },
      })
    ),
    on(
      ExperimentResultsActions.actionExperimentResultsDeleteRequest,
      (state: ExperimentResultsState, action) => ({
        ...state,
        // working: true
      })
    ),
    on(
      ExperimentResultsActions.actionExperimentResultsDeleteRequestDone,
      (state: ExperimentResultsState, action) => {
        const data = state.experimentResults.filter(
          (experiment) => experiment.id !== action.experimentResult.id
        );

        return {
          ...state,
          experimentResults: data,
        };
      }
    ),

    on(
      ExperimentResultsActions.actionExperimentResultsNameExistsRequestDone,
      (state: ExperimentResultsState, action) => {
        return {
          ...state,
          selectedExperimentResult: {
            ...state.selectedExperimentResult,
            nameExists: action.exists,
          },
        };
      }
    )
  )(experimentResultsState, experimentResultsAction);
}
