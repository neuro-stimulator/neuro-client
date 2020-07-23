import { ExperimentResult, IOEvent } from '@stechy1/diplomka-share';

import { AppState } from '@diplomka-frontend/stim-lib-store';
import { EntityGroup } from '@diplomka-frontend/stim-lib-list-utils';

export interface ExperimentResultsState extends AppState {
  experimentResults: ExperimentResult[];
  ghosts: [];
  selectedExperimentResult: {
    experimentResult: ExperimentResult;
    originalExperimentResult: ExperimentResult;
    data: IOEvent[];
    nameExists: boolean;
    isNew: boolean;
  };
  groups: EntityGroup<ExperimentResult>;
  hasGroups: boolean;
}
