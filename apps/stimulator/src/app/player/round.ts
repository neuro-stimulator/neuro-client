import { IOEvent } from '@stechy1/diplomka-share';

export interface Round {
  output: {
    event: IOEvent;
    x: number;
    y: number;
  };
  input: {
    event: IOEvent;
    x: number;
    y: number;
  };
}
