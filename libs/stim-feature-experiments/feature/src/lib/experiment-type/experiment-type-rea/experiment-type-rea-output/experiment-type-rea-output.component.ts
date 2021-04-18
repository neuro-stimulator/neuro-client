import { Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { Experiment, ExperimentType, ReaOutput, TvepOutput } from '@stechy1/diplomka-share';

import { TOKEN_MAX_OUTPUT_COUNT } from '@diplomka-frontend/stim-lib-common';

@Component({
  selector: 'stim-feature-experiments-experiment-type-rea-output',
  templateUrl: './experiment-type-rea-output.component.html',
  styleUrls: ['./experiment-type-rea-output.component.sass'],
})
export class ExperimentTypeReaOutputComponent implements OnInit, OnDestroy {

  @Input() form: FormGroup;
  @Input() count: number;
  @Input() experimentReady: Observable<Experiment<ReaOutput>>;

  private _experimentReadySubscription: Subscription;
  private _emptyExperiment = true;

  constructor(@Inject(TOKEN_MAX_OUTPUT_COUNT) private readonly _maxOutputCount: number) {}

  ngOnInit(): void {
    this._experimentReadySubscription = this.experimentReady.subscribe((experiment: Experiment<TvepOutput>) => {
      if (experiment.type !== ExperimentType.NONE) {
        this._emptyExperiment = false;
      }
    });
  }

  ngOnDestroy(): void {
    this._experimentReadySubscription.unsubscribe();
  }

  get outputs() {
    return (this.form.get('outputs') as FormArray).controls;
  }

  outputType(index: number): FormGroup {
    return this.outputs[index].get('outputType') as FormGroup;
  }

}
