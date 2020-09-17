import { Action, createReducer, on } from '@ngrx/store';

import { StimulatorStateType } from '../domain/stimulator-state';
import * as StimulatorActions from './stimulator.actions';
import { StimulatorState } from './stimulator.state';

export const stimulatorReducerKey = 'stimulator';

export function stimulatorReducer(
  stimulatorState: StimulatorState | undefined,
  stimulatorAction: Action
) {
  return createReducer(
    {
      previousStimulatorState: StimulatorStateType.UNKNOWN,
      stimulatorState: StimulatorStateType.UNKNOWN,
      devices: [],
    },
    on(
      StimulatorActions.actionCommandStimulatorStateRequestDone,
      (state: StimulatorState, action) => ({
        ...state,
        stimulatorState: action.state,
      })
    ),
    on(
      StimulatorActions.actionStimulatorDiscoverRequest,
      (state: StimulatorState, action) => ({
        ...state,
        devices: [],
      })
    ),
    on(
      StimulatorActions.actionStimulatorDiscoverDone,
      (state: StimulatorState, action) => ({
        ...state,
        devices: action.data,
      })
    ),
    on(
      StimulatorActions.actionStimulatorClearDiscovered,
      (state: StimulatorState, action) => ({
        ...state,
        devices: [],
      })
    ),
    on(
      StimulatorActions.actionCommandStimulatorUploadRequestDone,
      (state: StimulatorState, action) => ({
        ...state,
        previousStimulatorState: StimulatorStateType.UPLOAD,
        stimulatorState: StimulatorStateType.UPLOAD,
      })
    ),
    on(
      StimulatorActions.actionCommandStimulatorUploadRequestFail,
      (state: StimulatorState, action) => ({
        ...state,
        stimulatorState: state.previousStimulatorState,
      })
    ),
    on(
      StimulatorActions.actionCommandStimulatorSetupRequestDone,
      (state: StimulatorState, action) => ({
        ...state,
        stimulatorState: StimulatorStateType.SETUP,
      })
    ),
    on(
      StimulatorActions.actionCommandStimulatorRunRequestDone,
      (state: StimulatorState, action) => ({
        ...state,
        stimulatorState: StimulatorStateType.RUN,
      })
    ),
    on(
      StimulatorActions.actionCommandStimulatorPauseRequestDone,
      (state: StimulatorState, action) => ({
        ...state,
        stimulatorState: StimulatorStateType.PAUSE,
      })
    ),
    on(
      StimulatorActions.actionCommandStimulatorFinishRequestDone,
      (state: StimulatorState, action) => ({
        ...state,
        stimulatorState: StimulatorStateType.FINISH,
      })
    ),
    on(
      StimulatorActions.actionCommandStimulatorClearRequestDone,
      (state: StimulatorState, action) => ({
        ...state,
        stimulatorState: StimulatorStateType.CLEAR,
      })
    )
  )(stimulatorState, stimulatorAction);
}
