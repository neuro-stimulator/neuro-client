import { AppState } from "@diplomka-frontend/stim-lib-store";

import { StimulatorStateType } from "../domain/stimulator-state";

export interface StimulatorState extends AppState {
  stimulatorState: StimulatorStateType,
  devices: [{path: string}]
}


