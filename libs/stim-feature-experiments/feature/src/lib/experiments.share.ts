import { Options as SliderOptions } from '@angular-slider/ngx-slider';

export function dependencyValidatorPattern(maxOutputCount) {
  return `^[0-${maxOutputCount}]x[1-9]+[0-9]*`;
}

export function outputCountValidatorPattern(maxOutputCount) {
  return `^[0-${maxOutputCount}]{1}$`;
}

export function outputCountParams(maxOutputCount): SliderOptions {
  return {
    floor: 1,
    ceil: maxOutputCount,
    showTicks: true,
    showTicksValues: true,
    tickStep: 1,
    animate: false,
  };
}

export const brightnessSliderOptions: SliderOptions = {
  floor: 0,
  ceil: 100,
  showTicks: false,
  showTicksValues: false,
  tickStep: 1,
  showSelectionBar: true,
  animate: false,
  translate: (value: number) => `${value}%`,
};
