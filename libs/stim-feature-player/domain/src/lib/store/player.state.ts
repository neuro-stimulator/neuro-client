import { IOEvent } from '@stechy1/diplomka-share';

export interface PlayerState {
  ioData: IOEvent[][];
  experimentRound: number;
  playerInitialized: boolean;
}
