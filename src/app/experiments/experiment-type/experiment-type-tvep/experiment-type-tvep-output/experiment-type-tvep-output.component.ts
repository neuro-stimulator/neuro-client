import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Options as SliderOptions } from 'ng5-slider/options';

@Component({
  selector: 'app-experiment-type-tvep-output',
  templateUrl: './experiment-type-tvep-output.component.html',
  styleUrls: ['./experiment-type-tvep-output.component.sass']
})
export class ExperimentTypeTvepOutputComponent implements OnInit {

  brightnessSliderOptions: SliderOptions = {
    floor: 0,
    ceil: 100,
    showTicks: false,
    showTicksValues: false,
    tickStep: 1,
    showSelectionBar: true,
    animate: false
  };

  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  get outputs() {
    return (this.form.get('outputs') as FormArray).controls;
  }

  patternLength(index: number) {
    return this.outputs[index].get('patternLength');
  }

  out(index: number) {
    return this.outputs[index].get('out');
  }

  wait(index: number) {
    return this.outputs[index].get('wait');
  }

  brightness(index: number) {
    return this.outputs[index].get('brightness');
  }

}
