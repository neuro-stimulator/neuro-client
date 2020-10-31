import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { NGXLogger } from 'ngx-logger';
import { Options as SliderOptions } from 'ng5-slider/options';

import { createEmptyExperimentREA, ExperimentREA, ReaOnResponseFail, ReaOutput } from '@stechy1/diplomka-share';

import { ExperimentsFacade } from '@diplomka-frontend/stim-feature-experiments/domain';
import { ShareValidators } from '@diplomka-frontend/stim-lib-ui';
import { ModalComponent } from '@diplomka-frontend/stim-lib-modal';
import { NavigationFacade } from '@diplomka-frontend/stim-feature-navigation/domain';
import { AliveCheckerFacade } from '@diplomka-frontend/stim-lib-connection';
import { TOKEN_MAX_OUTPUT_COUNT } from '@diplomka-frontend/stim-lib-common';

import { brightnessSliderOptions } from '../../experiments.share';
import { ExperimentNameValidator } from '../../experiment-name-validator';
import { BaseExperimentTypeComponent } from '../base-experiment-type.component';
import { ExperimentOutputTypeValidator } from '../output-type/experiment-output-type-validator';

@Component({
  templateUrl: './experiment-type-rea.component.html',
  styleUrls: ['./experiment-type-rea.component.sass'],
})
export class ExperimentTypeReaComponent extends BaseExperimentTypeComponent<ExperimentREA, ReaOutput> implements OnInit {
  @ViewChild('modal', { static: true }) modal: ModalComponent;

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

  protected _createFormControls(): { [p: string]: AbstractControl } {
    const superControls = super._createFormControls();
    const myControls = {
      usedOutputs: new FormGroup(
        {
          led: new FormControl(null),
          audio: new FormControl(null),
          audioFile: new FormControl(null),
          image: new FormControl(null),
          imageFile: new FormControl(null),
        },
        [Validators.required, ExperimentOutputTypeValidator.createValidator()]
      ),
      cycleCount: new FormControl(null, [Validators.required, Validators.min(1)]),
      waitTimeMin: new FormControl(null, [Validators.required, ShareValidators.exclusiveMin(0)]),
      waitTimeMax: new FormControl(null, [Validators.required, ShareValidators.exclusiveMin(0)]),
      missTime: new FormControl(null, [Validators.required, ShareValidators.exclusiveMin(0)]),
      onFail: new FormControl(null, [Validators.required]),
      brightness: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
    };

    return { ...superControls, ...myControls };
  }

  protected _createEmptyExperiment(): ExperimentREA {
    return createEmptyExperimentREA();
  }

  protected get modalComponent(): ModalComponent {
    return this.modal;
  }

  get onFails() {
    return [
      {
        id: ReaOnResponseFail.CONTINUE,
        name: 'EXPERIMENTS.EXPERIMENT.REA.ON_FAIL.CONTINUE',
      },
      {
        id: ReaOnResponseFail.WAIT,
        name: 'EXPERIMENTS.EXPERIMENT.REA.ON_FAIL.WAIT',
      },
    ];
  }

  get brightnessSliderOptions(): SliderOptions {
    return brightnessSliderOptions;
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
