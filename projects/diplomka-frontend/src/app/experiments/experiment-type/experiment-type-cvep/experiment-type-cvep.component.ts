import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';
import { Options as SliderOptions } from 'ng5-slider/options';

import { createEmptyExperimentCVEP, ExperimentCVEP } from '@stechy1/diplomka-share';

import { environment } from '../../../../environments/environment';
import { NavigationService } from '../../../navigation/navigation.service';
import { ShareValidators } from '../../../share/share-validators';
import { brightnessSliderOptions, outputCountParams } from '../../experiments.share';
import { ExperimentsService } from '../../experiments.service';
import { ExperimentNameValidator } from '../../experiment-name-validator';
import { BaseExperimentTypeComponent } from '../base-experiment-type.component';
import { ExperimentOutputTypeValidator } from '../output-type/experiment-output-type-validator';

@Component({
  selector: 'stim-experiment-type-cvep',
  templateUrl: './experiment-type-cvep.component.html',
  styleUrls: ['./experiment-type-cvep.component.sass']
})
export class ExperimentTypeCvepComponent extends BaseExperimentTypeComponent<ExperimentCVEP> implements OnInit {

  bitShiftSliderOptions: SliderOptions = {
    floor: 0,
    ceil: 31,
    showTicks: false,
    showTicksValues: false,
    tickStep: 1,
    showSelectionBar: true,
    animate: false
  };

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
      out: new FormControl(null, [Validators.required, ShareValidators.exclusiveMin(0)]),
      wait: new FormControl(null, [Validators.required, ShareValidators.exclusiveMin(0)]),
      pattern: new FormControl(null, [Validators.required]),
      bitShift: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(31)]),
      brightness: new FormControl(null, [
        Validators.required, Validators.min(0), Validators.max(100)
      ])
    };

    return {...superControls, ...myControls};
  }

  protected _createEmptyExperiment(): ExperimentCVEP {
    return createEmptyExperimentCVEP();
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

  get out() {
    return this.form.get('out');
  }

  get wait() {
    return this.form.get('wait');
  }

  get pattern() {
    return this.form.get('pattern');
  }

  get bitShift() {
    return this.form.get('bitShift');
  }

  get brightness() {
    return this.form.get('brightness');
  }

}
