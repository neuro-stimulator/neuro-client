import { ChangeDetectorRef, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';
import { Options as SliderOptions } from 'ng5-slider';

import { ExperimentType, ExperimentERP, Edge, Random, Sequence, createEmptyExperimentERP } from '@stechy1/diplomka-share';

import { environment } from '../../../../environments/environment';
import { NavigationService } from '../../../navigation/navigation.service';
import { dependencyValidatorPattern, outputCountParams } from '../../experiments.share';
import { ExperimentsService } from '../../experiments.service';
import { BaseExperimentTypeComponent } from '../base-experiment-type.component';
import { ExperimentTypeErpOutputDependencyValidator } from './experiment-type-erp-output-dependency.validator';
import { ExperimentOutputTypeValidator } from '../output-type/experiment-output-type-validator';
import { SequenceService } from '../../../sequences/sequence.service';
import { ModalComponent } from '../../../share/modal/modal.component';
import { SequenceFastDialogComponent } from './sequence-fast-dialog/sequence-fast-dialog.component';

@Component({
  selector: 'app-experiment-type-erp',
  templateUrl: './experiment-type-erp.component.html',
  styleUrls: ['./experiment-type-erp.component.sass']
})
export class ExperimentTypeErpComponent extends BaseExperimentTypeComponent<ExperimentERP> implements OnInit {

  @ViewChild('modal', {static: true}) modal: ModalComponent;

  sequences$: EventEmitter<Sequence[]> = new EventEmitter<Sequence[]>();

  constructor(service: ExperimentsService,
              private readonly sequenceService: SequenceService,
              toastr: ToastrService,
              router: Router,
              route: ActivatedRoute,
              navigation: NavigationService,
              cdr: ChangeDetectorRef,
              logger: NGXLogger) {
    super(service, toastr, router, route, navigation, cdr, logger);
    this._experimentLoaded$.subscribe((experiment: ExperimentERP) => this._handleLoadedExperiment(experiment));
  }

  ngOnInit() {
    super.ngOnInit();
  }

  private _handleLoadedExperiment(experiment: ExperimentERP) {
    if (experiment.type === ExperimentType.NONE) {
      return;
    }

    this.sequenceService.forExperiment(experiment)
        .then(sequences => {
          this.sequences$.next(sequences);
        });
  }

  private _createOutputFormControl(): FormGroup {
    return new FormGroup({
      id: new FormControl(null, Validators.required),
      experimentId: new FormControl(null, Validators.required),
      orderId: new FormControl(null, [Validators.required, Validators.min(0)]),
      pulseUp: new FormControl(null, [Validators.required, Validators.min(0)]),
      pulseDown: new FormControl(null, [Validators.required, Validators.min(0)]),
      distribution: new FormControl(null, [Validators.required, Validators.min(0)]),
      brightness: new FormControl(null, [
        Validators.required, Validators.min(0), Validators.max(100)
      ]),
      dependencies: new FormArray([
        new FormControl([]),
        new FormControl(null, [
          Validators.pattern(dependencyValidatorPattern),
          ExperimentTypeErpOutputDependencyValidator.createValidator()]),
      ]),
      outputType: new FormGroup({
        led: new FormControl(null),
        audio: new FormControl(null),
        audioFile: new FormControl(null),
        image: new FormControl(null),
        imageFile: new FormControl(null)
      }, {validators: [Validators.required, ExperimentOutputTypeValidator.createValidator()]})
    });
  }

  protected _createFormControls(): { [p: string]: AbstractControl } {
    const superControls = super._createFormControls();
    const myControls = {
      outputCount: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(environment.maxOutputCount)]),
      maxDistribution: new FormControl(null, [Validators.required, Validators.min(1)]),
      out: new FormControl(null, [Validators.required, Validators.min(0)]),
      wait: new FormControl(null, [Validators.required, Validators.min(0)]),
      random: new FormControl(null, [Validators.required]),
      edge: new FormControl(null, [Validators.required]),
      usedOutputs: new FormGroup({
        led: new FormControl(null),
        audio: new FormControl(null),
        image: new FormControl(null),
      }),
      outputs: new FormArray([]),
      sequenceId: new FormControl(null)
    };

    return {...superControls, ...myControls};
  }

  protected _createEmptyExperiment(): ExperimentERP {
    return createEmptyExperimentERP();
  }

  protected _updateFormGroup(experiment: ExperimentERP) {
    if (experiment.outputs.length > 0) {
      for (let i = 0; i < environment.maxOutputCount; i++) {
        (this.form.get('outputs') as FormArray).push(this._createOutputFormControl());
      }
    } else {
      (this.form.get('outputs') as FormArray).clear();
    }

    super._updateFormGroup(experiment);
  }

  handleCreateNewSequenceFast() {
    this.modal.showComponent = SequenceFastDialogComponent;
    this.modal.openForResult()
        .then(result => { console.log(result); });
  }

  handleRemoveSequence() {
    this.form.patchValue({sequenceId: null});

  }

  get outputCountParams(): SliderOptions {
    return outputCountParams;
  }

  get randoms() {
    return [
      {id: Random.OFF, name: 'OFF'},
      {id: Random.SHORT, name: 'SHORT'},
      {id: Random.LONG, name: 'LONG'},
      {id: Random.SHORT_LONG, name: 'SHORT_LONG'},
    ];
  }

  get edges() {
    return [
      {id: Edge.FALLING, name: 'FALLING'},
      {id: Edge.LEADING, name: 'LEADING'}
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
