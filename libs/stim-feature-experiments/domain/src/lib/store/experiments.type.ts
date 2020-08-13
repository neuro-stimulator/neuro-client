import { Experiment, Sequence } from '@stechy1/diplomka-share';

import { AppState } from '@diplomka-frontend/stim-lib-store';
import {
  EntityGroup,
  SelectedEntities,
} from '@diplomka-frontend/stim-lib-list-utils';

export interface ExperimentsState extends AppState {
  experiments: Experiment[];
  selectedExperiments: SelectedEntities;
  selectionMode: boolean;
  ghosts: [];
  selectedExperiment: {
    experiment: Experiment;
    originalExperiment: Experiment;
    nameExists: boolean;
    isNew: boolean;
    sequences: Sequence[];
  };
  groups: EntityGroup<Experiment>;
  hasGroups: boolean;
}
