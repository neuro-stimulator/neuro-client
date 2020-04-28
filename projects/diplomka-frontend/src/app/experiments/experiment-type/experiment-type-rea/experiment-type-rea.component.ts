import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';
import { Options as SliderOptions } from 'ng5-slider/options';

import { createEmptyExperimentREA, ExperimentREA, ReaOnResponseFail } from '@stechy1/diplomka-share';

import { environment } from '../../../../environments/environment';
import { NavigationService } from '../../../navigation/navigation.service';
import { ShareValidators } from '../../../share/share-validators';
import { brightnessSliderOptions, outputCountParams } from '../../experiments.share';
import { ExperimentsService } from '../../experiments.service';
import { ExperimentNameValidator } from '../../experiment-name-validator';
import { BaseExperimentTypeComponent } from '../base-experiment-type.component';
import { ExperimentOutputTypeValidator } from '../output-type/experiment-output-type-validator';

@Component({
  selector: 'app-experiment-type-rea',
  templateUrl: './experiment-type-rea.component.html',
  styleUrls: ['./experiment-type-rea.component.sass']
})
export class ExperimentTypeReaComponent extends BaseExperimentTypeComponent<ExperimentREA> implements OnInit {

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

  protected _createFormControls(): { [p: string]: AbstractControl } {
    const superControls = super._createFormControls();
    const myControls = {
      outputCount: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(environment.maxOutputCount)]),
      usedOutputs: new FormGroup({
        led: new FormControl(null),
        audio: new FormControl(null),
        audioFile: new FormControl(null),
        image: new FormControl(null),
        imageFile: new FormControl(null)
      }, [Validators.required, ExperimentOutputTypeValidator.createValidator()]),
      cycleCount: new FormControl(null, [Validators.required, Validators.min(1)]),
      waitTimeMin: new FormControl(null, [Validators.required, ShareValidators.exclusiveMin(0)]),
      waitTimeMax: new FormControl(null, [Validators.required, ShareValidators.exclusiveMin(0)]),
      missTime: new FormControl(null, [Validators.required, ShareValidators.exclusiveMin(0)]),
      onFail: new FormControl(null, [Validators.required]),
      brightness: new FormControl(null, [
        Validators.required, Validators.min(0), Validators.max(100)
      ])
    };

    return {...superControls, ...myControls};
  }

  protected _createEmptyExperiment(): ExperimentREA {
    return createEmptyExperimentREA();
  }

  get onFails() {
    return [
      {id: ReaOnResponseFail.CONTINUE, name: 'EXPERIMENTS.EXPERIMENT.REA.ON_FAIL.CONTINUE'},
      {id: ReaOnResponseFail.WAIT, name: 'EXPERIMENTS.EXPERIMENT.REA.ON_FAIL.WAIT'},
    ];
  }

  get outputCountParams(): SliderOptions {
    return outputCountParams;
  }

  get brightnessSliderOptions(): SliderOptions {
    return brightnessSliderOptions;
  }

  get outputCount() {
    return this.form.get('outputCount');
  }

  get usedOutputs(): FormGroup {
    return this.form.get('usedOutputs') as FormGroup;
  }

  get cycleCount() {
    return this.form.get('cycleCount');
  }

  get waitTimeMin() {
    return this.form.get('waitTimeMin');
  }

  get waitTimeMax() {
    return this.form.get('waitTimeMax');
  }

  get missTime() {
    return this.form.get('missTime');
  }

  get onFail() {
    return this.form.get('onFail');
  }

  get brightness() {
    return this.form.get('brightness');
  }
}
