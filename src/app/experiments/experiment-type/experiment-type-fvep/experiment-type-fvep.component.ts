import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';
import { Options as SliderOptions } from 'ng5-slider/options';

import { ExperimentType, ExperimentFVEP } from 'diplomka-share';

import { environment } from '../../../../environments/environment';
import { NavigationService } from '../../../navigation/navigation.service';
import { ExperimentsService } from '../../experiments.service';
import { BaseExperimentTypeComponent } from '../base-experiment-type.component';
import { ExperimentOutputTypeValidator } from '../output-type/experiment-output-type-validator';

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
              cdr: ChangeDetectorRef,
              logger: NGXLogger) {
    super(service, toastr, router, route, navigation, cdr, logger);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  private _createOutputFormControl(): FormGroup {
    return new FormGroup({
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
      usedOutputs: {},
      outputCount: 1,
      outputs: []
    };
  }

  protected _updateFormGroup(experiment: ExperimentFVEP) {
    if (experiment.outputs.length > 0) {
      for (let i = 0; i < environment.maxOutputCount; i++) {
        (this.form.get('outputs') as FormArray).push(this._createOutputFormControl());
      }
    } else {
      (this.form.get('outputs') as FormArray).clear();
    }

    super._updateFormGroup(experiment);
  }

  get outputCount() {
    return this.form.get('outputCount');
  }


}
