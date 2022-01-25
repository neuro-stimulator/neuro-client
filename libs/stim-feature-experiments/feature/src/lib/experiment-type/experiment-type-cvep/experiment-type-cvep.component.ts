import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { NGXLogger } from 'ngx-logger';
import { Options as SliderOptions } from '@angular-slider/ngx-slider';

import { createEmptyExperimentCVEP, CvepOutput, ExperimentCVEP } from '@stechy1/diplomka-share';

import { TOKEN_MAX_OUTPUT_COUNT } from '@neuro-client/stim-lib-common';
import { ShareValidators } from '@neuro-client/stim-lib-ui';
import { ModalComponent } from '@neuro-client/stim-lib-modal';
import { AliveCheckerFacade } from '@neuro-client/stim-lib-connection';
import { ExperimentsFacade } from '@neuro-client/stim-feature-experiments/domain';
import { NavigationFacade } from '@neuro-client/stim-feature-navigation/domain';

import { brightnessSliderOptions } from '../../experiments.share';
import { ExperimentNameValidator } from '../../experiment-name-validator';
import { BaseExperimentTypeComponent } from '../base-experiment-type.component';
import { ExperimentOutputTypeValidator } from '../output-type/experiment-output-type-validator';

@Component({
  templateUrl: './experiment-type-cvep.component.html',
  styleUrls: ['./experiment-type-cvep.component.sass'],
})
export class ExperimentTypeCvepComponent extends BaseExperimentTypeComponent<ExperimentCVEP, CvepOutput> implements OnInit {
  @ViewChild('modal', { static: true }) modal: ModalComponent;

  bitShiftSliderOptions: SliderOptions = {
    floor: 0,
    ceil: 31,
    showTicks: false,
    showTicksValues: false,
    tickStep: 1,
    showSelectionBar: true,
    animate: false,
  };

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
      out: new FormControl(null, [Validators.required, ShareValidators.exclusiveMin(0)]),
      wait: new FormControl(null, [Validators.required, ShareValidators.exclusiveMin(0)]),
      pattern: new FormControl(null, [Validators.required]),
      bitShift: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(31)]),
      brightness: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
    };

    return { ...superControls, ...myControls };
  }

  protected _createEmptyExperiment(): ExperimentCVEP {
    return createEmptyExperimentCVEP();
  }

  protected get modalComponent(): ModalComponent {
    return this.modal;
  }

  get brightnessSliderOptions(): SliderOptions {
    return brightnessSliderOptions;
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
