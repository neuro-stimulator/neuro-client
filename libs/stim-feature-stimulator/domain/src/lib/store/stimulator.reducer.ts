import { Action, createReducer, on } from "@ngrx/store";

import { StimulatorStateType } from "../domain/stimulator-state";
import * as StimulatorActions from './stimulator.actions';
import { StimulatorState } from "./stimulator.state";

export const stimulatorReducerKey = 'stimulator';

export function stimulatorReducer(stimulatorState: StimulatorState | undefined, stimulatorAction: Action) {
  return createReducer(
    {
      stimulatorState: StimulatorStateType.READY,
      devices: []
    },
    on(StimulatorActions.actionCommandStimulatorStateRequestDone, (state: StimulatorState, action) => ({
      ...state,
      state: action.state
    })),
    on(StimulatorActions.actionStimulatorDiscoverRequest, (state: StimulatorState, action) => ({
      ...state,
      devices: []
    })),
    on(StimulatorActions.actionStimulatorDiscoverDone, (state: StimulatorState, action) => ({
      ...state,
      devices: action.data
    })),
    on(StimulatorActions.actionStimulatorClearDiscovered, (state: StimulatorState, action) => ({
      ...state,
      devices: []
    }))
  )(stimulatorState, stimulatorAction);
}
