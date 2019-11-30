import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Options as SliderOptions } from 'ng5-slider/options';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../../environments/environment';

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
  @Input() count: number;

  readonly patternSizes: BehaviorSubject<number>[] = []; // new BehaviorSubject<number>(1);

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < environment.maxOutputCount; i++) {
      this.patternSizes.push(new BehaviorSubject<number>(1));
    }

    setTimeout(() => {
      for (let i = 0; i < environment.maxOutputCount; i++) {
        this.patternLength(i).valueChanges.subscribe(patternLength => {
          this.patternSizes[i].next(patternLength);
        });
      }
    }, 500);
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
