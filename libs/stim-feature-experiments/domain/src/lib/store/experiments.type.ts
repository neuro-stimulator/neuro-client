import { Experiment, Output, Sequence } from '@stechy1/diplomka-share';

import { AppState } from '@neuro-client/stim-lib-store';
import { EntityGroup, SelectedEntities } from '@neuro-client/stim-lib-list-utils';

export interface ExperimentsState extends AppState {
  experiments: Experiment<Output>[];
  selectedExperiments: SelectedEntities;
  selectionMode: boolean;
  ghosts: unknown[];
  selectedExperiment: {
    experiment: Experiment<Output>;
    originalExperiment: Experiment<Output>;
    nameExists: boolean;
    isNew: boolean;
    sequences: Sequence[];
  };
  groups: EntityGroup<Experiment<Output>>;
  hasGroups: boolean;
  synchronizeOutputs: boolean;
}
