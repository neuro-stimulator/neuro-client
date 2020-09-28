import { ExperimentStopConditionType } from '@stechy1/diplomka-share';

import { StopConditionType } from '../store/player.state';

const STOP_CONDITION_PREFIX = 'EXPERIMENT_PLAYER.PARAMS.STOP_CONDITION.TYPES.';
const STOP_CONDITIONS_MAPPER = [
  'NO_STOP_CONDITION',
  'COUNTING_EXPERIMENT_STOP_CONDITION',
  'COUNTING_CYCLE_STOP_CONDITION',
];

export function mapStopCondition(
  stopCondition: ExperimentStopConditionType
): StopConditionType {
  return {
    id: stopCondition,
    name: STOP_CONDITION_PREFIX + STOP_CONDITIONS_MAPPER[stopCondition],
  };
}
