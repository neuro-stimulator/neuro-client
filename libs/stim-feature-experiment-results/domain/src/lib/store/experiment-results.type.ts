import { ExperimentResult, IOEvent } from '@stechy1/diplomka-share';

import { AppState } from '@neuro-client/stim-lib-store';
import {
  EntityGroup,
  SelectedEntities,
} from '@neuro-client/stim-lib-list-utils';

export interface ExperimentResultsState extends AppState {
  experimentResults: ExperimentResult[];
  selectedExperimentResults: SelectedEntities;
  selectionMode: boolean;
  ghosts: unknown[];
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
