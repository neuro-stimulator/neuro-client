import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';
import { Options as SliderOptions } from 'ng5-slider/options';

import {
  createEmptyExperimentFVEP,
  ExperimentFVEP,
} from '@stechy1/diplomka-share';

import { ShareValidators } from '@diplomka-frontend/stim-lib-ui';
import { ExperimentsFacade } from '@diplomka-frontend/stim-feature-experiments/domain';
import { NavigationFacade } from '@diplomka-frontend/stim-feature-navigation/domain';

import { outputCountParams } from '../../experiments.share';
import { ExperimentNameValidator } from '../../experiment-name-validator';
import { BaseExperimentTypeComponent } from '../base-experiment-type.component';
import { ExperimentOutputTypeValidator } from '../output-type/experiment-output-type-validator';
import { AliveCheckerFacade } from '@diplomka-frontend/stim-lib-connection';
import { TOKEN_MAX_OUTPUT_COUNT } from '@diplomka-frontend/stim-lib-common';

@Component({
  selector: 'stim-feature-experiments-experiment-type-fvep',
  templateUrl: './experiment-type-fvep.component.html',
  styleUrls: ['./experiment-type-fvep.component.sass'],
})
export class ExperimentTypeFvepComponent
  extends BaseExperimentTypeComponent<ExperimentFVEP>
  implements OnInit {
  constructor(
    @Inject(TOKEN_MAX_OUTPUT_COUNT) private readonly _maxOutputCount: number,
    service: ExperimentsFacade,
    route: ActivatedRoute,
    navigation: NavigationFacade,
    connection: AliveCheckerFacade,
    logger: NGXLogger
  ) {
    super(
      service,
      route,
      navigation,
      connection,
      new ExperimentNameValidator(service),
      logger
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }

  private _createOutputFormControl(): FormGroup {
    return new FormGroup({
      id: new FormControl(null, Validators.required),
      experimentId: new FormControl(null, Validators.required),
      orderId: new FormControl(null, Validators.required),
      timeOn: new FormControl(null, [
        Validators.required,
        ShareValidators.exclusiveMin(0),
      ]),
      timeOff: new FormControl(null, [
        Validators.required,
        ShareValidators.exclusiveMin(0),
      ]),
      frequency: new FormControl(null, [
        Validators.required,
        ShareValidators.exclusiveMin(0),
      ]),
      dutyCycle: new FormControl(null, [
        Validators.required,
        ShareValidators.exclusiveMin(0),
      ]),
      brightness: new FormControl(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      outputType: new FormGroup(
        {
          led: new FormControl(null),
          audio: new FormControl(null),
          audioFile: new FormControl(null),
          image: new FormControl(null),
          imageFile: new FormControl(null),
        },
        [Validators.required, ExperimentOutputTypeValidator.createValidator()]
      ),
    });
  }

  protected _createFormControls(): { [p: string]: AbstractControl } {
    const superControls = super._createFormControls();
    const myControls = {
      outputCount: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(this._maxOutputCount),
      ]),
      outputs: new FormArray([]),
    };

    return { ...superControls, ...myControls };
  }

  protected _createEmptyExperiment(): ExperimentFVEP {
    return createEmptyExperimentFVEP();
  }

  protected _updateFormGroup(experiment: ExperimentFVEP) {
    if (experiment.outputs?.length > 0) {
      for (let i = 0; i < this._maxOutputCount; i++) {
        (this.form.get('outputs') as FormArray).push(
          this._createOutputFormControl()
        );
      }
    } else {
      (this.form.get('outputs') as FormArray).clear();
    }

    super._updateFormGroup(experiment);
  }

  get outputCountParams(): SliderOptions {
    return outputCountParams(this._maxOutputCount);
  }

  get outputCount() {
    return this.form.get('outputCount');
  }
}
