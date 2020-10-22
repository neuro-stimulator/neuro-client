import {
  AfterContentInit,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
  createEmptyExperimentTVEP,
  ExperimentTVEP,
  TvepOutput,
} from '@stechy1/diplomka-share';

import { ExperimentsFacade } from '@diplomka-frontend/stim-feature-experiments/domain';
import { ShareValidators } from '@diplomka-frontend/stim-lib-ui';

import { outputCountParams } from '../../experiments.share';
import { ExperimentNameValidator } from '../../experiment-name-validator';
import { BaseExperimentTypeComponent } from '../base-experiment-type.component';
import { ExperimentOutputTypeValidator } from '../output-type/experiment-output-type-validator';
import { NavigationFacade } from '@diplomka-frontend/stim-feature-navigation/domain';
import { AliveCheckerFacade } from '@diplomka-frontend/stim-lib-connection';
import { TOKEN_MAX_OUTPUT_COUNT } from '@diplomka-frontend/stim-lib-common';

@Component({
  templateUrl: './experiment-type-tvep.component.html',
  styleUrls: ['./experiment-type-tvep.component.sass'],
})
export class ExperimentTypeTvepComponent
  extends BaseExperimentTypeComponent<ExperimentTVEP, TvepOutput>
  implements OnInit, AfterContentInit, OnDestroy {
  readonly sharePatternLengthEmitter: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();

  constructor(
    @Inject(TOKEN_MAX_OUTPUT_COUNT) maxOutputCount: number,
    service: ExperimentsFacade,
    route: ActivatedRoute,
    navigation: NavigationFacade,
    connection: AliveCheckerFacade,
    logger: NGXLogger
  ) {
    super(
      maxOutputCount,
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

  ngAfterContentInit(): void {
    this.sharePatternLength.valueChanges.subscribe(
      (sharePatternLength: boolean) =>
        this.sharePatternLengthEmitter.next(sharePatternLength)
    );
  }

  protected _createOutputFormControl(): { [p: string]: AbstractControl } {
    const superControls = super._createOutputFormControl();
    const myControls = {
      out: new FormControl(null, [
        Validators.required,
        ShareValidators.exclusiveMin(0),
      ]),
      wait: new FormControl(null, [
        Validators.required,
        ShareValidators.exclusiveMin(0),
      ]),
      patternLength: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(32),
      ]),
      pattern: new FormControl(null, [Validators.required]),
    };

    return { ...superControls, ...myControls };
  }

  protected _createFormControls(): { [p: string]: AbstractControl } {
    const superControls = super._createFormControls();
    const myControls = {
      outputCount: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(this._maxOutputCount),
      ]),
      sharePatternLength: new FormControl(null, [Validators.required]),
      outputs: new FormArray([]),
    };

    return { ...superControls, ...myControls };
  }

  protected _createEmptyExperiment(): ExperimentTVEP {
    return createEmptyExperimentTVEP();
  }

  get sharePatternLength() {
    return this.form.get('sharePatternLength');
  }
}
