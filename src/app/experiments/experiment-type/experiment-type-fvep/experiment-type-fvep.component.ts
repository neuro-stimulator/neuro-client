import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { ToastrService } from 'ngx-toastr';
import { Options as SliderOptions } from 'ng5-slider/options';

import { environment } from '../../../../environments/environment';

import { ExperimentType, ExperimentFVEP } from 'diplomka-share';

import { ExperimentsService } from '../../experiments.service';
import { BaseExperimentTypeComponent } from '../base-experiment-type.component';
import { NavigationService } from '../../../navigation/navigation.service';

@Component({
  selector: 'app-experiment-type-fvep',
  templateUrl: './experiment-type-fvep.component.html',
  styleUrls: ['./experiment-type-fvep.component.sass']
})
export class ExperimentTypeFvepComponent extends BaseExperimentTypeComponent<ExperimentFVEP> implements OnInit {

  outputCountParams: SliderOptions = {
    floor: 1,
    ceil: environment.maxOutputCount,
    showTicks: true,
    showTicksValues: true,
    tickStep: 1,
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
      timeOn: new FormControl(null, [Validators.required]),
      timeOff: new FormControl(null, [Validators.required]),
      frequency: new FormControl(null, [Validators.required]),
      dutyCycle: new FormControl(null, [Validators.required]),
      brightness: new FormControl(null, [Validators.required])
    };

    return {...superControls, ...myControls};
  }

  protected _createEmptyExperiment(): ExperimentFVEP {
    return {
      name: '',
      description: '',
      created: new Date().getTime(),
      type: ExperimentType.FVEP,
      output: {},
      outputCount: 1,
      timeOn: 0,
      timeOff: 0,
      frequency: 0,
      dutyCycle: 0,
      brightness: 0
    };
  }


  get outputCount() {
    return this.form.get('outputCount');
  }

  get timeOn() {
    return this.form.get('timeOn');
  }

  get timeOff() {
    return this.form.get('timeOff');
  }

  get frequency() {
    return this.form.get('frequency');
  }

  get dutyCycle() {
    return this.form.get('dutyCycle');
  }

  get brightness() {
    return this.form.get('brightness');
  }
}
