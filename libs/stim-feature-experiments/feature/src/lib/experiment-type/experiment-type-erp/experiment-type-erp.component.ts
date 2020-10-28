import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { NGXLogger } from 'ngx-logger';

import { createEmptyExperimentERP, Edge, ErpOutput, ExperimentERP, Random } from '@stechy1/diplomka-share';

import { DropdownBtnComponent, ShareValidators } from '@diplomka-frontend/stim-lib-ui';
import { AliveCheckerFacade } from '@diplomka-frontend/stim-lib-connection';
import { TOKEN_MAX_OUTPUT_COUNT } from '@diplomka-frontend/stim-lib-common';
import { ModalComponent } from '@diplomka-frontend/stim-lib-modal';
import { ExperimentsFacade, ExperimentsState } from '@diplomka-frontend/stim-feature-experiments/domain';
import { NavigationFacade } from '@diplomka-frontend/stim-feature-navigation/domain';

import { dependencyValidatorPattern } from '../../experiments.share';
import { ExperimentNameValidator } from '../../experiment-name-validator';
import { BaseExperimentTypeComponent } from '../base-experiment-type.component';
import { ExperimentTypeErpOutputDependencyValidator } from './experiment-type-erp-output-dependency.validator';
import { SequenceFastDialogComponent } from './sequence-fast-dialog/sequence-fast-dialog.component';

@Component({
  templateUrl: './experiment-type-erp.component.html',
  styleUrls: ['./experiment-type-erp.component.sass'],
})
export class ExperimentTypeErpComponent extends BaseExperimentTypeComponent<ExperimentERP, ErpOutput> implements OnInit, OnDestroy {
  @ViewChild('modal', { static: true }) modal: ModalComponent;

  @ViewChild(DropdownBtnComponent) dropdown: DropdownBtnComponent;

  private _sequenceIdSubscription: Subscription;

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
    this._sequenceIdSubscription = this._facade.state
      .pipe(map((state: ExperimentsState) => (state.selectedExperiment.experiment as ExperimentERP)?.sequenceId))
      .subscribe((sequenceId: number) => {
        this.form.patchValue({ sequenceId });
      });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this._sequenceIdSubscription.unsubscribe();
  }

  protected _createOutputFormControl(): { [p: string]: AbstractControl } {
    const superControls = super._createOutputFormControl();
    const myControls = {
      pulseUp: new FormControl(null, [Validators.required, ShareValidators.exclusiveMin(0)]),
      pulseDown: new FormControl(null, [Validators.required, ShareValidators.exclusiveMin(0)]),
      distribution: new FormControl(null, [Validators.required, Validators.min(0)]),
      dependencies: new FormArray([
        new FormControl([]),
        new FormControl(null, [
          Validators.pattern(dependencyValidatorPattern(this._maxOutputCount)),
          ExperimentTypeErpOutputDependencyValidator.createValidator(this._maxOutputCount),
        ]),
      ]),
    };

    return { ...superControls, ...myControls };
  }

  protected _createFormControls(): { [p: string]: AbstractControl } {
    const superControls = super._createFormControls();
    const myControls = {
      outputCount: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(this._maxOutputCount)]),
      maxDistribution: new FormControl(null, [Validators.required, Validators.min(1)]),
      out: new FormControl(null, [Validators.required, ShareValidators.exclusiveMin(0)]),
      wait: new FormControl(null, [Validators.required, ShareValidators.exclusiveMin(0)]),
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

  handleCreateNewSequenceFast() {
    this.dropdown.showDropdown = false;
    this.modal.showComponent = SequenceFastDialogComponent;
    this.modal
      .openForResult()
      .catch(() => {
        this.logger.warn('Nebudu vytvářet žádnou sekvenci.');
      })
      .then((result?: { name: string; size: number }) => {
        if (result === undefined) {
          return;
        }

        this._facade.generateSequenceFromNameAndSize(result.name, result.size);
      });
  }

  handleRemoveSequence() {
    this.form.patchValue({ sequenceId: null });
  }

  protected get modalComponent(): ModalComponent {
    return this.modal;
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
