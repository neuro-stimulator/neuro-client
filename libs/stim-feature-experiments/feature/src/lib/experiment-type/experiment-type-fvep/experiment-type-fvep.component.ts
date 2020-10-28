import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { NGXLogger } from 'ngx-logger';

import { createEmptyExperimentFVEP, ExperimentFVEP, FvepOutput } from '@stechy1/diplomka-share';

import { TOKEN_MAX_OUTPUT_COUNT } from '@diplomka-frontend/stim-lib-common';
import { ShareValidators } from '@diplomka-frontend/stim-lib-ui';
import { ExperimentsFacade } from '@diplomka-frontend/stim-feature-experiments/domain';
import { NavigationFacade } from '@diplomka-frontend/stim-feature-navigation/domain';
import { AliveCheckerFacade } from '@diplomka-frontend/stim-lib-connection';

import { ExperimentNameValidator } from '../../experiment-name-validator';
import { BaseExperimentTypeComponent } from '../base-experiment-type.component';
import { ExperimentOutputTypeValidator } from '../output-type/experiment-output-type-validator';

@Component({
  selector: 'stim-feature-experiments-experiment-type-fvep',
  templateUrl: './experiment-type-fvep.component.html',
  styleUrls: ['./experiment-type-fvep.component.sass'],
})
export class ExperimentTypeFvepComponent extends BaseExperimentTypeComponent<ExperimentFVEP, FvepOutput> implements OnInit {
  constructor(
    @Inject(TOKEN_MAX_OUTPUT_COUNT) maxOutputCount: number,
    service: ExperimentsFacade,
    route: ActivatedRoute,
    navigation: NavigationFacade,
    connection: AliveCheckerFacade,
    logger: NGXLogger
  ) {
    super(maxOutputCount, service, route, navigation, connection, new ExperimentNameValidator(service), logger);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected _createOutputFormControl(): { [p: string]: AbstractControl } {
    const superControls = super._createOutputFormControl();
    const myControls = {
      id: new FormControl(null, Validators.required),
      experimentId: new FormControl(null, Validators.required),
      orderId: new FormControl(null, Validators.required),
      timeOn: new FormControl(null, [Validators.required, ShareValidators.exclusiveMin(0)]),
      timeOff: new FormControl(null, [Validators.required, ShareValidators.exclusiveMin(0)]),
      frequency: new FormControl(null, [Validators.required, ShareValidators.exclusiveMin(0)]),
      dutyCycle: new FormControl(null, [Validators.required, ShareValidators.exclusiveMin(0)]),
      brightness: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
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
    };

    return { ...superControls, ...myControls };
  }

  protected _createFormControls(): { [p: string]: AbstractControl } {
    const superControls = super._createFormControls();
    const myControls = {
      outputCount: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(this._maxOutputCount)]),
      outputs: new FormArray([]),
    };

    return { ...superControls, ...myControls };
  }

  protected _createEmptyExperiment(): ExperimentFVEP {
    return createEmptyExperimentFVEP();
  }
}
