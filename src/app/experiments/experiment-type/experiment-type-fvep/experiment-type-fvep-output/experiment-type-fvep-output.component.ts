import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Options as SliderOptions } from 'ng5-slider/options';

@Component({
  selector: 'app-experiment-type-fvep-output',
  templateUrl: './experiment-type-fvep-output.component.html',
  styleUrls: ['./experiment-type-fvep-output.component.sass']
})
export class ExperimentTypeFvepOutputComponent implements OnInit {

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
  @Input() count: number;
  @Input() experimentReady: Observable<any>;

  constructor() { }

  ngOnInit() {
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
