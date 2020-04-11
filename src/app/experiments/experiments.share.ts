import { Experiment } from '@stechy1/diplomka-share';

import { environment } from '../../environments/environment';
import { Options as SliderOptions } from 'ng5-slider/options';

export const dependencyValidatorPattern = `^[0-${environment.maxOutputCount}]x[1-9]+[0-9]*`;

export const outputCountValidatorPattern = `^[0-${environment.maxOutputCount}]{1}$`;

export type ExperimentGroup = Array<{ group: string, experiments: Experiment[] }>;

export const outputCountParams: SliderOptions = {
  floor: 1,
  ceil: environment.maxOutputCount,
  showTicks: true,
  showTicksValues: true,
  tickStep: 1,
  animate: false
};

export const brightnessSliderOptions: SliderOptions = {
  floor: 0,
  ceil: 100,
  showTicks: false,
  showTicksValues: false,
  tickStep: 1,
  showSelectionBar: true,
  animate: false,
  translate: (value: number) => `${value}%`
};
