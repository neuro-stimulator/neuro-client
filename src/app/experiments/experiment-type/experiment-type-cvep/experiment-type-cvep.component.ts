import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Options as SliderOptions } from 'ng5-slider/options';

import { environment } from '../../../../environments/environment';

import { ExperimentType, ExperimentCVEP } from 'diplomka-share';

import { ExperimentsService } from '../../experiments.service';
import { BaseExperimentTypeComponent } from '../base-experiment-type.component';
import { NavigationService } from '../../../navigation/navigation.service';

@Component({
  selector: 'app-experiment-type-cvep',
  templateUrl: './experiment-type-cvep.component.html',
  styleUrls: ['./experiment-type-cvep.component.sass']
})
export class ExperimentTypeCvepComponent extends BaseExperimentTypeComponent<ExperimentCVEP> implements OnInit {

  outputCountParams: SliderOptions = {
    floor: 1,
    ceil: environment.maxOutputCount,
    showTicks: true,
    showTicksValues: true,
    tickStep: 1,
    animate: false
  };

  bitShiftSliderOptions: SliderOptions = {
    floor: 0,
    ceil: 31,
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

  constructor(service: ExperimentsService,
              toastr: ToastrService,
              router: Router,
              route: ActivatedRoute,
              navigation: NavigationService,
              cdr: ChangeDetectorRef) {
    super(service, toastr, router, route, navigation, cdr);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected _createFormControls(): { [p: string]: AbstractControl } {
    const superControls = super._createFormControls();
    const myControls = {
      outputCount: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(environment.maxOutputCount)]),
      out: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(9999)]),
      wait: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(9999)]),
      pattern: new FormControl(null, [Validators.required]),
      bitShift: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(31)]),
      brightness: new FormControl(null, [Validators.required])
    };

    return {...superControls, ...myControls};
  }

  protected _createEmptyExperiment(): ExperimentCVEP {
    return {
      name: '',
      description: '',
      created: new Date().getTime(),
      type: ExperimentType.CVEP,
      output: {},
      outputCount: 1,
      out: 0,
      wait: 0,
      pattern: 0,
      bitShift: 0,
      brightness: 100
    };
  }

  get outputCount() {
    return this.form.get('outputCount');
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
