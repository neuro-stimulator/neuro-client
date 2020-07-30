import { ExperimentStopConditionType, IOEvent } from '@stechy1/diplomka-share';

export interface PlayerState {
  ioData: IOEvent[][];
  playerInitialized: boolean;
  repeat: number;
  betweenExperimentInterval: number;
  autoplay: boolean;
  isBreakTime: boolean;
  stopConditionType: ExperimentStopConditionType;
}
