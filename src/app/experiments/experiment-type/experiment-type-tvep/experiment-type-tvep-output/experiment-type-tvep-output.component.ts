import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Options as SliderOptions } from 'ng5-slider/options';

import { Experiment, ExperimentType } from '@stechy1/diplomka-share';

import { environment } from '../../../../../environments/environment';
import { brightnessSliderOptions } from '../../../experiments.share';

@Component({
  selector: 'app-experiment-type-tvep-output',
  templateUrl: './experiment-type-tvep-output.component.html',
  styleUrls: ['./experiment-type-tvep-output.component.sass']
})
export class ExperimentTypeTvepOutputComponent implements OnInit, OnDestroy {

  patternLengthSliderOptions: SliderOptions = {
    floor: 1,
    ceil: 32,
    showTicks: false,
    showTicksValues: false,
    tickStep: 1,
    showSelectionBar: true,
    animate: false
  };

  @Input() form: FormGroup;
  @Input() count: number;
  @Input() experimentReady: Observable<Experiment>;
  @Input() sharePatternLength: Observable<boolean>;

  readonly patternSizes: BehaviorSubject<number>[] = [];

  private _experimentReadySubscription: Subscription;
  private _patternLengthSubscriptions: Subscription[] = [];
  private _sharePatternLengthSubscription: Subscription;
  private _outputCountSubscription: Subscription;
  private _emptyExperiment = true;
  private _sharePatternLength = true;
  private _disablePatternLengthPropagation = false;

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < environment.maxOutputCount; i++) {
      this.patternSizes.push(new BehaviorSubject<number>(1));
    }

    this._experimentReadySubscription = this.experimentReady.subscribe((experiment: Experiment) => {
      if (experiment.type !== ExperimentType.NONE) {
        this._emptyExperiment = false;
        for (let i = 0; i < environment.maxOutputCount; i++) {
          this._patternLengthSubscriptions.push(this.patternLength(i).valueChanges.subscribe((patternLength: number) => {
            this.patternSizes[i].next(patternLength);
            if (!this._disablePatternLengthPropagation) {
              this._handleSharePatternLengthChange(this._sharePatternLength, i);
            }
          }));

          this._updatePatternSizes(experiment.outputCount);
        }

        this._sharePatternLengthSubscription = this.sharePatternLength.subscribe((sharePatternLength: boolean) => {
          this._handleSharePatternLengthChange(sharePatternLength, 0);
        });

        this._outputCountSubscription = this.form.root.get('outputCount')
                                            .valueChanges
                                            .subscribe((value: number) => this._updatePatternSizes(value));
      }
    });
  }

  private _updatePatternSizes(outputCount: number) {
    this._disablePatternLengthPropagation = true;
    for (let j = 0; j < outputCount; j++) {
      this.patternSizes[j].next(this.patternLength(j).value);
    }
    this._disablePatternLengthPropagation = false;
  }

  ngOnDestroy(): void {
    if (!this._emptyExperiment) {
      for (let i = 0; i < environment.maxOutputCount; i++) {
        this._patternLengthSubscriptions[i].unsubscribe();
      }
      this._sharePatternLengthSubscription.unsubscribe();
      this._outputCountSubscription.unsubscribe();
    }
    this._experimentReadySubscription.unsubscribe();
  }

  private _handleSharePatternLengthChange(sharePatternLength: boolean, copyOutputPatternLengthIndex: number) {
    this._sharePatternLength = sharePatternLength;
    if (!sharePatternLength) {
      return;
    }

    const firstOutputPatternLength: number = this.outputs[copyOutputPatternLengthIndex].get('patternLength').value;
    this._disablePatternLengthPropagation = true;
    for (let i = 0; i < environment.maxOutputCount; i++) {
      if (i === copyOutputPatternLengthIndex) {
        continue;
      }
      this.outputs[i].get('patternLength').setValue(firstOutputPatternLength);
    }
    this._disablePatternLengthPropagation = false;
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
