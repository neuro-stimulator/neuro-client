import { AfterContentInit, Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';
import { Options as SliderOptions } from 'ng5-slider/options';

import { createEmptyExperimentTVEP, ExperimentTVEP } from '@stechy1/diplomka-share';

import { environment } from '../../../../environments/environment';
import { NavigationService } from '../../../navigation/navigation.service';
import { ShareValidators } from '../../../share/share-validators';
import { ExperimentsService } from '../../experiments.service';
import { outputCountParams } from '../../experiments.share';
import { ExperimentNameValidator } from '../../experiment-name-validator';
import { BaseExperimentTypeComponent } from '../base-experiment-type.component';
import { ExperimentOutputTypeValidator } from '../output-type/experiment-output-type-validator';

@Component({
  selector: 'app-experiment-type-tvep',
  templateUrl: './experiment-type-tvep.component.html',
  styleUrls: ['./experiment-type-tvep.component.sass']
})
export class ExperimentTypeTvepComponent extends BaseExperimentTypeComponent<ExperimentTVEP> implements OnInit, AfterContentInit, OnDestroy {

  readonly sharePatternLengthEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(service: ExperimentsService,
              toastr: ToastrService,
              router: Router,
              route: ActivatedRoute,
              navigation: NavigationService,
              nameValidator: ExperimentNameValidator,
              logger: NGXLogger) {
    super(service, toastr, router, route, navigation, nameValidator, logger);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterContentInit(): void {
    this.sharePatternLength.valueChanges.subscribe((sharePatternLength: boolean) => this.sharePatternLengthEmitter.next(sharePatternLength));
  }

  protected _createOutputFormControl(): FormGroup {
    return new FormGroup({
      id: new FormControl(null, Validators.required),
      experimentId: new FormControl(null, Validators.required),
      orderId: new FormControl(null, Validators.required),
      out: new FormControl(null, [Validators.required, ShareValidators.exclusiveMin(0)]),
      wait: new FormControl(null, [Validators.required, ShareValidators.exclusiveMin(0)]),
      patternLength: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(32)]),
      pattern: new FormControl(null, [Validators.required]),
      brightness: new FormControl(null, [
        Validators.required, Validators.min(0), Validators.max(100)
      ]),
      outputType: new FormGroup({
        led: new FormControl(null),
        audio: new FormControl(null),
        audioFile: new FormControl(null),
        image: new FormControl(null),
        imageFile: new FormControl(null)
      }, [Validators.required, ExperimentOutputTypeValidator.createValidator()])
    });
  }

  protected _createFormControls(): { [p: string]: AbstractControl } {
    const superControls = super._createFormControls();
    const myControls = {
      outputCount: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(environment.maxOutputCount)]),
      sharePatternLength: new FormControl(null, [Validators.required]),
      outputs: new FormArray([])
    };

    return {...superControls, ...myControls};
  }

  protected _createEmptyExperiment(): ExperimentTVEP {
    return createEmptyExperimentTVEP();
  }

  protected _updateFormGroup(experiment: ExperimentTVEP) {
    if (experiment.outputs.length > 0) {
      for (let i = 0; i < environment.maxOutputCount; i++) {
        (this.form.get('outputs') as FormArray).push(this._createOutputFormControl());
      }
    } else {
      (this.form.get('outputs') as FormArray).clear();
    }

    super._updateFormGroup(experiment);
  }

  get outputCountParams(): SliderOptions {
    return outputCountParams;
  }

  get outputCount() {
    return this.form.get('outputCount');
  }

  get sharePatternLength() {
    return this.form.get('sharePatternLength');
  }
}
