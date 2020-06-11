import { Options as SliderOptions } from 'ng5-slider/options';

// TODO environment variable
export const dependencyValidatorPattern = `^[0-${8/*environment.maxOutputCount*/}]x[1-9]+[0-9]*`;

// TODO environment variable
export const outputCountValidatorPattern = `^[0-${8/*environment.maxOutputCount*/}]{1}$`;

export const outputCountParams: SliderOptions = {
  floor: 1,
  // TODO environment variable
  ceil: 8/*environment.maxOutputCount*/,
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
