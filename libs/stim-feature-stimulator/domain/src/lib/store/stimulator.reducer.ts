import { Action, createReducer, on } from "@ngrx/store";

import * as StimulatorActions from './stimulator.actions';
import { StimulatorState } from "./stimulator.state";
import { StimulatorStateType } from "../domain/stimulator-state";

export const stimulatorReducerKey = 'stimulatorReducer';

export function stimulatorReducer(stimulatorState: StimulatorState | undefined, stimulatorAction: Action) {
  return createReducer(
    { stimulatorState: StimulatorStateType.READY },
    on(StimulatorActions.actionCommandStimulatorStateRequestDone, (state: StimulatorState, action) => ({
      ...state,
      state: action.state
    }))
  )(stimulatorState, stimulatorAction);
}
