import { PlayerConfiguration } from '@stechy1/diplomka-share';

export interface StopConditionType {
  id: number;
  name: string;
}

export interface PlayerState extends PlayerConfiguration {
  availableStopConditions: StopConditionType[];
}
