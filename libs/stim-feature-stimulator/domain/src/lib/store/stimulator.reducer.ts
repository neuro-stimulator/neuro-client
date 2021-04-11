import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';

import { StimulatorStateType } from '../domain/stimulator-state';
import * as StimulatorActions from './stimulator.actions';
import { StimulatorState } from './stimulator.state';

export const stimulatorReducerKey = 'stimulator';

export function stimulatorReducer(stimulatorState: StimulatorState | undefined, stimulatorAction: Action) {
  return createReducer(
    {
      previousStimulatorState: StimulatorStateType.UNKNOWN,
      stimulatorState: StimulatorStateType.UNKNOWN,
      devices: [],
    },
    on(StimulatorActions.actionCommandStimulatorStateRequestDone, (state: StimulatorState, action) => ({
      ...state,
      stimulatorState: action.state,
    })),
    on(StimulatorActions.actionStimulatorDiscoverRequest, (state: StimulatorState) => ({
      ...state,
      devices: [],
    })),
    on(StimulatorActions.actionStimulatorDiscoverDone, (state: StimulatorState, action) => ({
      ...state,
      devices: action.data,
    })),
    on(StimulatorActions.actionStimulatorClearDiscovered, (state: StimulatorState) => ({
      ...state,
      devices: [],
    })),
    on(StimulatorActions.actionCommandStimulatorUploadRequestDone, (state: StimulatorState) => ({
      ...state,
      previousStimulatorState: state.stimulatorState,
      stimulatorState: StimulatorStateType.UPLOAD,
    })),
    on(StimulatorActions.actionCommandStimulatorUploadRequestFail, (state: StimulatorState) => ({
      ...state,
      stimulatorState: state.previousStimulatorState,
    })),
    on(StimulatorActions.actionCommandStimulatorSetupRequestDone, (state: StimulatorState) => ({
      ...state,
      previousStimulatorState: state.stimulatorState,
      stimulatorState: StimulatorStateType.SETUP,
    })),
    on(StimulatorActions.actionCommandStimulatorSetupRequestFail, (state: StimulatorState) => ({
      ...state,
      stimulatorState: state.previousStimulatorState,
    })),
    on(StimulatorActions.actionCommandStimulatorRunRequestDone, (state: StimulatorState) => ({
      ...state,
      previousStimulatorState: state.stimulatorState,
      stimulatorState: StimulatorStateType.RUN,
    })),
    on(StimulatorActions.actionCommandStimulatorRunRequestFail, (state: StimulatorState) => ({
      ...state,
      stimulatorState: state.previousStimulatorState,
    })),
    on(StimulatorActions.actionCommandStimulatorPauseRequestDone, (state: StimulatorState) => ({
      ...state,
      previousStimulatorState: state.stimulatorState,
      stimulatorState: StimulatorStateType.PAUSE,
    })),
    on(StimulatorActions.actionCommandStimulatorPauseRequestFail, (state: StimulatorState) => ({
      ...state,
      stimulatorState: state.previousStimulatorState,
    })),
    on(StimulatorActions.actionCommandStimulatorFinishRequestDone, (state: StimulatorState) => ({
      ...state,
      previousStimulatorState: state.stimulatorState,
      stimulatorState: StimulatorStateType.FINISH,
    })),
    on(StimulatorActions.actionCommandStimulatorFinishRequestFail, (state: StimulatorState) => ({
      ...state,
      stimulatorState: state.previousStimulatorState,
    })),
    on(StimulatorActions.actionCommandStimulatorClearRequestDone, (state: StimulatorState) => ({
      ...state,
      previousStimulatorState: state.stimulatorState,
      stimulatorState: StimulatorStateType.CLEAR,
    })),
    on(StimulatorActions.actionCommandStimulatorClearRequestFail, (state: StimulatorState) => ({
      ...state,
      stimulatorState: state.previousStimulatorState,
    })),
  )(stimulatorState, stimulatorAction);
}

export const stimulatorFeature = createFeatureSelector<StimulatorState>(stimulatorReducerKey);
