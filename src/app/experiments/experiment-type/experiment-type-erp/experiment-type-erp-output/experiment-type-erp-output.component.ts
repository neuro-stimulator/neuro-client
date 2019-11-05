import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Options as SliderOptions } from 'ng5-slider';

@Component({
  selector: 'app-experiment-type-erp-output',
  templateUrl: './experiment-type-erp-output.component.html',
  styleUrls: ['./experiment-type-erp-output.component.sass']
})
export class ExperimentTypeErpOutputComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() count: number;

  distributionSliderOptions: SliderOptions = {
    floor: 0,
    ceil: 100,
    showTicks: false,
    showTicksValues: false,
    tickStep: 1,
    showSelectionBar: true,
    animate: false
  };

  brightnessSliderOptions: SliderOptions = {
    floor: 0,
    ceil: 100,
    showTicks: false,
    showTicksValues: false,
    tickStep: 1,
    showSelectionBar: true,
    animate: false
  };


  constructor() { }

  ngOnInit() {
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

  distributionValue(index: number) {
    return this.outputs[index].get('distributionValue');
  }

  distributionDelay(index: number) {
    return this.outputs[index].get('distributionDelay');
  }

  brightness(index: number) {
    return this.outputs[index].get('brightness');
  }
}
