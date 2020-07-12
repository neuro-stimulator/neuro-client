import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';
import { Options as SliderOptions } from 'ng5-slider';

import {
  createEmptyExperimentERP,
  Edge,
  ExperimentERP,
  Random,
} from '@stechy1/diplomka-share';

import { ModalComponent } from '@diplomka-frontend/stim-lib-modal';
import {
  ExperimentsFacade,
  ExperimentsState,
} from '@diplomka-frontend/stim-feature-experiments/domain';
import {
  DropdownBtnComponent,
  ShareValidators,
} from '@diplomka-frontend/stim-lib-ui';

import {
  dependencyValidatorPattern,
  outputCountParams,
} from '../../experiments.share';
import { ExperimentNameValidator } from '../../experiment-name-validator';
import { BaseExperimentTypeComponent } from '../base-experiment-type.component';
import { ExperimentOutputTypeValidator } from '../output-type/experiment-output-type-validator';
import { ExperimentTypeErpOutputDependencyValidator } from './experiment-type-erp-output-dependency.validator';
import { NavigationFacade } from '@diplomka-frontend/stim-feature-navigation/domain';
import { AliveCheckerFacade } from '@diplomka-frontend/stim-lib-connection';
import { SequenceFastDialogComponent } from './sequence-fast-dialog/sequence-fast-dialog.component';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './experiment-type-erp.component.html',
  styleUrls: ['./experiment-type-erp.component.sass'],
})
export class ExperimentTypeErpComponent
  extends BaseExperimentTypeComponent<ExperimentERP>
  implements OnInit, OnDestroy {
  @ViewChild('modal', { static: true }) modal: ModalComponent;

  @ViewChild(DropdownBtnComponent) dropdown: DropdownBtnComponent;

  private _sequenceIdSubscription: Subscription;

  constructor(
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
    this._sequenceIdSubscription = this._service.state
      .pipe(
        map(
          (state: ExperimentsState) =>
            (state.selectedExperiment.experiment as ExperimentERP)?.sequenceId
        )
      )
      .subscribe((sequenceId: number) => {
        this.form.patchValue({ sequenceId });
      });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this._sequenceIdSubscription.unsubscribe();
  }

  private _createOutputFormControl(): FormGroup {
    return new FormGroup({
      id: new FormControl(null, Validators.required),
      experimentId: new FormControl(null, Validators.required),
      orderId: new FormControl(null, [Validators.required, Validators.min(0)]),
      pulseUp: new FormControl(null, [
        Validators.required,
        ShareValidators.exclusiveMin(0),
      ]),
      pulseDown: new FormControl(null, [
        Validators.required,
        ShareValidators.exclusiveMin(0),
      ]),
      distribution: new FormControl(null, [
        Validators.required,
        Validators.min(0),
      ]),
      brightness: new FormControl(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      dependencies: new FormArray([
        new FormControl([]),
        new FormControl(null, [
          Validators.pattern(dependencyValidatorPattern),
          ExperimentTypeErpOutputDependencyValidator.createValidator(),
        ]),
      ]),
      outputType: new FormGroup(
        {
          led: new FormControl(null),
          audio: new FormControl(null),
          audioFile: new FormControl(null),
          image: new FormControl(null),
          imageFile: new FormControl(null),
        },
        {
          validators: [
            Validators.required,
            ExperimentOutputTypeValidator.createValidator(),
          ],
        }
      ),
    });
  }

  protected _createFormControls(): { [p: string]: AbstractControl } {
    const superControls = super._createFormControls();
    const myControls = {
      // TODO environment variable
      outputCount: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(8 /*environment.maxOutputCount*/),
      ]),
      maxDistribution: new FormControl(null, [
        Validators.required,
        Validators.min(1),
      ]),
      out: new FormControl(null, [
        Validators.required,
        ShareValidators.exclusiveMin(0),
      ]),
      wait: new FormControl(null, [
        Validators.required,
        ShareValidators.exclusiveMin(0),
      ]),
      random: new FormControl(null, [Validators.required]),
      edge: new FormControl(null, [Validators.required]),
      usedOutputs: new FormGroup({
        led: new FormControl(null),
        audio: new FormControl(null),
        image: new FormControl(null),
      }),
      outputs: new FormArray([]),
      sequenceId: new FormControl(null),
    };

    return { ...superControls, ...myControls };
  }

  protected _createEmptyExperiment(): ExperimentERP {
    return createEmptyExperimentERP();
  }

  protected _updateFormGroup(experiment: ExperimentERP) {
    if (experiment.outputs?.length > 0) {
      // TODO environment variable
      for (let i = 0; i < 8 /*environment.maxOutputCount*/; i++) {
        (this.form.get('outputs') as FormArray).push(
          this._createOutputFormControl()
        );
      }
    } else {
      (this.form.get('outputs') as FormArray).clear();
    }

    super._updateFormGroup(experiment);
  }

  handleCreateNewSequenceFast() {
    this.dropdown.showDropdown = false;
    this.modal.showComponent = SequenceFastDialogComponent;
    this.modal
      .openForResult()
      .catch((reason) => {
        this.logger.warn('Nebudu vytvářet žádnou sekvenci.');
      })
      .then((result?: { name: string; size: number }) => {
        if (result === undefined) {
          return;
        }

        this._service.generateSequenceFromNameAndSize(result.name, result.size);
      });
  }

  handleRemoveSequence() {
    this.form.patchValue({ sequenceId: null });
  }

  get outputCountParams(): SliderOptions {
    return outputCountParams;
  }

  get randoms() {
    return [
      { id: Random.OFF, name: 'EXPERIMENTS.EXPERIMENT.ERP.RANDOM.OFF' },
      { id: Random.SHORT, name: 'EXPERIMENTS.EXPERIMENT.ERP.RANDOM.SHORT' },
      { id: Random.LONG, name: 'EXPERIMENTS.EXPERIMENT.ERP.RANDOM.LONG' },
      {
        id: Random.SHORT_LONG,
        name: 'EXPERIMENTS.EXPERIMENT.ERP.RANDOM.SHORT_LONG',
      },
    ];
  }

  get edges() {
    return [
      { id: Edge.FALLING, name: 'EXPERIMENTS.EXPERIMENT.ERP.EDGE.FALLING' },
      { id: Edge.LEADING, name: 'EXPERIMENTS.EXPERIMENT.ERP.EDGE.LEADING' },
    ];
  }

  get outputCount() {
    return this.form.get('outputCount');
  }

  get maxDistribution() {
    return this.form.get('maxDistribution');
  }

  get out() {
    return this.form.get('out');
  }

  get wait() {
    return this.form.get('wait');
  }

  get random() {
    return this.form.get('random');
  }

  get edge() {
    return this.form.get('edge');
  }

  get sequenceId() {
    return this.form.get('sequenceId');
  }
}
