import { ExperimentResult } from '@stechy1/diplomka-share';

import { AppState } from '@diplomka-frontend/stim-lib-store';
import { EntityGroup } from '@diplomka-frontend/stim-lib-list-utils';

export interface ExperimentResultsState extends AppState {
  experimentResults: ExperimentResult[];
  ghosts: [];
  selectedExperimentResult: {
    experimentResult: ExperimentResult;
    originalExperimentResult: ExperimentResult;
    nameExists: boolean;
    isNew: boolean;
  };
  groups: EntityGroup<ExperimentResult>;
  hasGroups: boolean;
}
