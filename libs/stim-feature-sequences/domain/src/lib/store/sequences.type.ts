import { AppState } from "@diplomka-frontend/stim-lib-store";
import { SequencesStateType } from "./sequences-state-type";

export interface SequencesState extends AppState  {
  sequences: SequencesStateType;
}
