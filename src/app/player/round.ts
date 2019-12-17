import { IOEvent } from '../share/serial-data.event';

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
