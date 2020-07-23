import { Experiment, Sequence } from '@stechy1/diplomka-share';

import { AppState } from '@diplomka-frontend/stim-lib-store';
import { EntityGroup } from '@diplomka-frontend/stim-lib-list-utils';

export interface SequencesState extends AppState {
  sequences: Sequence[];
  ghosts: [];
  selectedSequence: {
    sequence: Sequence;
    originalSequence: Sequence;
    nameExists: boolean;
    isNew: boolean;
    experiments: Experiment[];
    experiment: Experiment;
  };
  groups: EntityGroup<Sequence>;
  hasGroups: boolean;
}
