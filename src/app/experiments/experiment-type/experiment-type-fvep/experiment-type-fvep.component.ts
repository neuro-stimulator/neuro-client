import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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

  protected _createOutputsFormControls(): FormGroup[] {
    const array = [];
    for (let i = 0; i < environment.maxOutputCount; i++) {
      const group = new FormGroup({
        id: new FormControl(null, Validators.required),
        experimentId: new FormControl(null, Validators.required),
        orderId: new FormControl(null, Validators.required),
        timeOn: new FormControl(null, [Validators.required]),
        timeOff: new FormControl(null, [Validators.required]),
        frequency: new FormControl(null, [Validators.required]),
        dutyCycle: new FormControl(null, [Validators.required]),
        brightness: new FormControl(null, [
          Validators.required, Validators.min(0), Validators.max(100)
        ]),
      });
      group.setParent(this.form);
      array.push(group);
    }

    return array;
  }

  protected _createFormControls(): { [p: string]: AbstractControl } {
    const superControls = super._createFormControls();
    const myControls = {
      outputCount: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(environment.maxOutputCount)]),
      outputs: new FormArray([])
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
      outputs: []
      // timeOn: 0,
      // timeOff: 0,
      // frequency: 0,
      // dutyCycle: 0,
      // brightness: 100
    };
  }

  protected _updateFormGroup(experiment: ExperimentFVEP) {
    if (experiment.outputs.length > 0) {
      (this.form.get('outputs') as FormArray).controls = this._createOutputsFormControls();
    } else {
      (this.form.get('outputs') as FormArray).controls = [];
    }

    super._updateFormGroup(experiment);
  }

  get outputCount() {
    return this.form.get('outputCount');
  }


}
