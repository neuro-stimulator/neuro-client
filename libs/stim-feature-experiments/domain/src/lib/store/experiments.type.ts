import { AppState } from "@diplomka-frontend/stim-lib-store";

import { Experiment } from "@stechy1/diplomka-share";

import { EntityGroup } from "@diplomka-frontend/stim-lib-list-utils";

export interface ExperimentsState extends AppState {
  experiments: Experiment[];
  ghosts: [];
  selectedExperiment: {
    experiment: Experiment;
    originalExperiment: Experiment;
    nameExists: boolean;
    isNew: boolean;
  }
  groups: EntityGroup<Experiment>
  hasGroups: boolean;
}
