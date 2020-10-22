import {
  OutputType,
  HorizontalAlignment,
  VerticalAlignment,
} from '@stechy1/diplomka-share';

export interface OutputEntry {
  id: number;
  outputType: OutputType;
  x: number;
  y: number;
  width: number;
  height: number;
  manualAlignment: boolean;
  horizontalAlignment: HorizontalAlignment;
  verticalAlignment: VerticalAlignment;
  dragging: boolean;
  selected: boolean;
}
