import { ExperimentResult } from "@stechy1/diplomka-share";

export interface ExperimentResultsState {
  experimentResults: ExperimentResult[],
  selectedExperimentResult: {
    experimentResult: ExperimentResult,
    nameExists: boolean,
    isNew: boolean
  },
  groups: [],
  hasGroups: boolean,
  working: boolean
}
