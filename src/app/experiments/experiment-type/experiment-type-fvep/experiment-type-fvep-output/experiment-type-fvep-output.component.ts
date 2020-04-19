import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

import { Options as SliderOptions } from 'ng5-slider/options';

import { environment } from '../../../../../environments/environment';
import { brightnessSliderOptions} from '../../../experiments.share';

@Component({
  selector: 'app-experiment-type-fvep-output',
  templateUrl: './experiment-type-fvep-output.component.html',
  styleUrls: ['./experiment-type-fvep-output.component.sass']
})
export class ExperimentTypeFvepOutputComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() count: number;

  activeSide: {left: boolean, right: boolean}[] = [];

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < environment.maxOutputCount; i++) {
      this.activeSide.push({left: true, right: false});
    }
  }

  handleChangeActiveSide(i: number) {
    this.activeSide[i].left = !this.activeSide[i].left;
    this.activeSide[i].right = !this.activeSide[i].right;
  }

  handleTimeChange(event: Event, index: number) {
    if (!this.activeSide[index].left) {
      return;
    }

    const timeOnValue = +this.timeOn(index).value as number;
    const timeOffValue = +this.timeOff(index).value as number;
    const frequencyControl = this.frequency(index);
    const dutyCycleControl = this.dutyCycle(index);

    frequencyControl.setValue(timeOnValue + timeOffValue);
    dutyCycleControl.setValue((timeOnValue + timeOffValue) / timeOffValue);
  }

  handleRatioChange(event: Event, index: number) {
    if (!this.activeSide[index].right) {
      return;
    }

    const frequencyValue = +this.frequency(index).value as number;
    const dutyCycleValue = +this.dutyCycle(index).value as number;
    const timeOnControl = this.timeOn(index);
    const timeOffControl = this.timeOff(index);

    timeOffControl.setValue(frequencyValue / dutyCycleValue);
    timeOnControl.setValue(frequencyValue - (frequencyValue / dutyCycleValue));
  }

  get brightnessSliderOptions(): SliderOptions {
    return brightnessSliderOptions;
  }

  get outputs() {
    return (this.form.get('outputs') as FormArray).controls;
  }

  outputType(index: number): FormGroup {
    return this.outputs[index].get('outputType') as FormGroup;
  }

  timeOn(index: number) {
    return this.outputs[index].get('timeOn');
  }

  timeOff(index: number) {
    return this.outputs[index].get('timeOff');
  }

  frequency(index: number) {
    return this.outputs[index].get('frequency');
  }

  dutyCycle(index: number) {
    return this.outputs[index].get('dutyCycle');
  }

  brightness(index: number) {
    return this.outputs[index].get('brightness');
}
}
