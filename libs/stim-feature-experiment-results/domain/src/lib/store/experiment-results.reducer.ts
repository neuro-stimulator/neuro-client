import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import { createEmptyExperiment, createEmptyExperimentResult, ExperimentResult } from '@stechy1/diplomka-share';

import { ExperimentResultsState } from './experiment-results.type';
import * as ExperimentResultsActions from './experiment-results.actions';
import * as fromAuth from '@neuro-client/stim-feature-auth/domain';

export const experimentResultsReducerKey = 'experimentResults';

const emptyExperimentResult: ExperimentResult = createEmptyExperimentResult(createEmptyExperiment());

export function experimentResultsReducer(experimentResultsState: ExperimentResultsState, experimentResultsAction: Action) {
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
      selectedExperimentResults: {},
      selectionMode: false,
    },
    on(ExperimentResultsActions.actionExperimentResultsAllRequest, (state: ExperimentResultsState) => ({
      ...state,
      working: true,
    })),
    on(ExperimentResultsActions.actionExperimentResultsAllWithGhostRequest, (state: ExperimentResultsState, action) => ({
      ...state,
      ghosts: new Array(action?.count || 5),
    })),
    on(ExperimentResultsActions.actionExperimentResultsAllRequestDone, (state: ExperimentResultsState, action) => ({
      ...state,
      experimentResults: action.experimentResults,
      selectedExperimentResult: {
        ...state.selectedExperimentResult,
        experimentResult: {
          ...state.selectedExperimentResult.experimentResult,
        },
      },
      ghosts: [],
    })),
    on(ExperimentResultsActions.actionExperimentResultsAllRequestFail, (state: ExperimentResultsState) => ({
      ...state,
      experimentResults: [],
      ghosts: [],
    })),
    on(ExperimentResultsActions.actionExperimentResultsEmpty, (state: ExperimentResultsState, action) => ({
      ...state,
      selectedExperimentResult: {
        ...state.selectedExperimentResult,
        experiment: { ...action.emptyExperimentResult },
        isNew: true,
      },
    })),
    on(ExperimentResultsActions.actionExperimentResultsOneRequestDone, (state: ExperimentResultsState, action) => ({
      ...state,
      experimentResults: [...state.experimentResults],
      selectedExperimentResult: {
        ...state.selectedExperimentResult,
        experimentResult: { ...action.experimentResult },
        originalExperimentResult: { ...action.experimentResult },
        isNew: false,
      },
    })),

    on(ExperimentResultsActions.actionExperimentResultsDataDone, (state: ExperimentResultsState, action) => ({
      ...state,
      selectedExperimentResult: {
        ...state.selectedExperimentResult,
        data: action.data,
      },
    })),

    on(ExperimentResultsActions.actionExperimentResultsUpdateRequest, (state: ExperimentResultsState, action) => ({
      ...state,
      selectedExperimentResult: {
        ...state.selectedExperimentResult,
        experimentResult: { ...action.experimentResult },
      },
    })),
    on(ExperimentResultsActions.actionExperimentResultsUpdateRequestDone, (state: ExperimentResultsState, action) => {
      const index = state.experimentResults.findIndex((experimentResult: ExperimentResult) => experimentResult.id === action.experimentResult.id);
      let data = [...state.experimentResults];
      if (index >= 0) {
        data = [...state.experimentResults.slice(0, index), action.experimentResult, ...state.experimentResults.slice(index + 1)];
      }
      return {
        ...state,
        experimentResults: data,
        selectedExperimentResult: {
          ...state.selectedExperimentResult,
          originalExperimentResult: { ...action.experimentResult },
        },
      };
    }),
    on(ExperimentResultsActions.actionExperimentResultsUpdateRequestFail, (state: ExperimentResultsState) => ({
      ...state,
      selectedExperimentResult: {
        ...state.selectedExperimentResult,
        experimentResult: {
          ...state.selectedExperimentResult.originalExperimentResult,
        },
      },
    })),
    on(ExperimentResultsActions.actionExperimentResultsDeleteRequest, (state: ExperimentResultsState) => ({
      ...state,
      // working: true
    })),
    on(ExperimentResultsActions.actionExperimentResultsDeleteRequestDone, (state: ExperimentResultsState, action) => {
      const data = state.experimentResults.filter((experimentResult) => experimentResult.id !== action.experimentResult.id);
      const selectedExperimentResults = {
        ...state.selectedExperimentResults,
      };
      delete selectedExperimentResults[action.experimentResult.id];
      let selectionMode = false;
      for (const selected of Object.values<boolean>(selectedExperimentResults)) {
        if (selected) {
          selectionMode = true;
          break;
        }
      }

      return {
        ...state,
        experimentResults: data,
        selectedExperimentResults,
        selectionMode,
      };
    }),

    on(ExperimentResultsActions.actionExperimentResultsNameExistsRequestDone, (state: ExperimentResultsState, action) => {
      return {
        ...state,
        selectedExperimentResult: {
          ...state.selectedExperimentResult,
          nameExists: action.exists,
        },
      };
    }),

    on(ExperimentResultsActions.actionExperimentResultsToggleSelected, (state: ExperimentResultsState, action) => {
      let selectionMode = state.selectionMode;
      const selectedExperimentResults = {
        ...state.selectedExperimentResults,
      };
      selectedExperimentResults[action.experimentResult.id] = selectedExperimentResults[action.experimentResult.id] ? false : true;
      if (selectedExperimentResults[action.experimentResult.id]) {
        selectionMode = true;
      } else {
        selectionMode = Object.values(selectedExperimentResults).reduce((previousValue, currentValue) => previousValue || currentValue);
      }

      return {
        ...state,
        selectedExperimentResults,
        selectionMode,
      };
    }),
    on(ExperimentResultsActions.actionExperimentResultsSelectAll, (state: ExperimentResultsState) => {
      const selectedExperimentResults = {};
      for (const experimentResult of state.experimentResults) {
        selectedExperimentResults[experimentResult.id] = true;
      }

      return {
        ...state,
        selectedExperimentResults,
      };
    }),
    on(ExperimentResultsActions.actionExperimentResultsSelectNone, (state: ExperimentResultsState) => {
      return {
        ...state,
        selectedExperimentResults: [],
        selectionMode: false,
      };
    }),
    on(fromAuth.actionLogoutRequestDone, (state, action) => ({
      ...state,
      experimentResults: [],
      selectedExperimentResult: {
        experimentResult: emptyExperimentResult,
        originalExperimentResult: emptyExperimentResult,
        data: [],
        nameExists: false,
        isNew: true,
      }
    }))
  )(experimentResultsState, experimentResultsAction);
}

export const experimentResultsFeature = createFeatureSelector<ExperimentResultsState>(experimentResultsReducerKey);

export const experimentResultsSelector = createSelector(experimentResultsFeature, (state: ExperimentResultsState) => state.experimentResults);
