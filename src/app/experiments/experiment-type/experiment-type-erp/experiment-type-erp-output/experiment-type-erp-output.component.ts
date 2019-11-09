import { Component, Input} from '@angular/core';
import { FormArray, FormGroup} from '@angular/forms';

import { Options as SliderOptions } from 'ng5-slider';

import { environment } from '../../../../../environments/environment';

import { OutputDependency } from 'diplomka-share';

@Component({
  selector: 'app-experiment-type-erp-output',
  templateUrl: './experiment-type-erp-output.component.html',
  styleUrls: ['./experiment-type-erp-output.component.sass']
})
export class ExperimentTypeErpOutputComponent {

  private static readonly GENERAL_DISTRIBUTION_SLIDER_OPTIONS: SliderOptions = {
    floor: 0,
    ceil: 100,
    showTicks: false,
    showTicksValues: false,
    tickStep: 1,
    showSelectionBar: true,
    animate: false
  };

  @Input() form: FormGroup;
  @Input() count: number;
  @Input() experimentId: number;

  distributionSliderOptions: SliderOptions[] = [];

  brightnessSliderOptions: SliderOptions = {
    floor: 0,
    ceil: 100,
    showTicks: false,
    showTicksValues: false,
    tickStep: 1,
    showSelectionBar: true,
    animate: false
  };

  constructor() {
    for (let i = 0; i < environment.maxOutputCount; i++) {
      this.distributionSliderOptions.push(ExperimentTypeErpOutputComponent.GENERAL_DISTRIBUTION_SLIDER_OPTIONS);
    }
  }

  private _addDependency(index: number, value: string) {
    let dependencies = this.dependencies(index).value as OutputDependency[];
    if (dependencies === undefined) {
      dependencies = [];
      this.dependencies(index).setValue(dependencies);
    }

    const params = value.split('x');

    dependencies.push({
      id: Math.random(),
      experimentId: this.experimentId,
      sourceOutput: index + 1,
      destOutput: +params[0],
      count: +params[1]
    });
  }

  private _removeDependency(index: number, dependency: OutputDependency) {
    const dependencies = this.dependencies(index).value as OutputDependency[];
    dependencies.splice(dependencies.findIndex(value => value.id === dependency.id));
  }

  get outputs() {
    return (this.form.get('outputs') as FormArray).controls;
  }

  pulseUp(index: number) {
    return this.outputs[index].get('pulseUp');
  }

  pulseDown(index: number) {
    return this.outputs[index].get('pulseDown');
  }

  distribution(index: number) {
    return this.outputs[index].get('distribution');
  }

  distributionOptions(index: number) {
    return this.distributionSliderOptions[index];
  }

  brightness(index: number) {
    return this.outputs[index].get('brightness');
  }

  dependencies(index: number) {
    return (this.outputs[index].get('dependencies') as FormArray).controls[0];
  }

  dependencyValue(index: number) {
    return (this.outputs[index].get('dependencies') as FormArray).controls[1];
  }

  handleRemoveDependency(index: number, dependency: OutputDependency) {
    this._removeDependency(index, dependency);
  }

  handleDependencyKeyUp(event: KeyboardEvent, index: number, value: string) {
    if (event.key === 'Enter') {
      if (this.dependencyValue(index).invalid) {
        return;
      }
      if (value.trim().length === 0) {
        return;
      }

      const srcElement = (event.target as HTMLInputElement);
      this._addDependency(index, value);
      srcElement.value = '';
    }
  }
}
