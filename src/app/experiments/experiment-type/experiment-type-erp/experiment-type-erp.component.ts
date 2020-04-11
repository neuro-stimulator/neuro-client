import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';
import { Options as SliderOptions } from 'ng5-slider';

import { createEmptyExperimentERP, Edge, ExperimentERP, ExperimentType, Random, Sequence } from '@stechy1/diplomka-share';

import { environment } from '../../../../environments/environment';
import { NavigationService } from '../../../navigation/navigation.service';
import { SequenceService } from '../../../sequences/sequence.service';
import { ModalComponent } from '../../../share/modal/modal.component';
import { ShareValidators } from '../../../share/share-validators';
import { dependencyValidatorPattern, outputCountParams } from '../../experiments.share';
import { ExperimentsService } from '../../experiments.service';
import { ExperimentNameValidator } from '../../experiment-name-validator';
import { BaseExperimentTypeComponent } from '../base-experiment-type.component';
import { ExperimentOutputTypeValidator } from '../output-type/experiment-output-type-validator';
import { ExperimentTypeErpOutputDependencyValidator } from './experiment-type-erp-output-dependency.validator';
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
              nameValidator: ExperimentNameValidator,
              logger: NGXLogger) {
    super(service, toastr, router, route, navigation, nameValidator, logger);
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
        .then((sequences: Sequence[]) => {
          this.sequences$.next(sequences);
        });
  }

  private _createOutputFormControl(): FormGroup {
    return new FormGroup({
      id: new FormControl(null, Validators.required),
      experimentId: new FormControl(null, Validators.required),
      orderId: new FormControl(null, [Validators.required, Validators.min(0)]),
      pulseUp: new FormControl(null, [Validators.required, ShareValidators.exclusiveMin(0)]),
      pulseDown: new FormControl(null, [Validators.required, ShareValidators.exclusiveMin(0)]),
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
        .catch((reason) => {
          this.logger.warn('Nebudu vytvářet žádnou sekvenci.');
        })
        .then((result?: {name: string, size: number}) => {
          if (result === undefined) {
            return;
          }

          this.sequenceService.fromNameAndSize(this.experiment.id, result.name, result.size)
              .catch((reason) => {
                this.logger.error('Sekvenci se nepodařilo vytvořit!');
              })
              .then((sequence?: Sequence) => {
                if (sequence === undefined) {
                  return;
                }

                this.sequenceService.forExperiment(this.experiment)
                    .then((sequences: Sequence[]) => {
                      this.sequences$.next(sequences);
                      this.sequenceId.setValue(sequence.id);
                      this._service.update(this.form.value).then(() => {

                        this.sequenceService.generaceSequence(this.experiment.id, sequence.size)
                            .then((data: number[]) => {
                              sequence.data = data;
                              this.sequenceService.update(sequence).finally();
                            });
                      });
                    });
              });
        });
  }

  handleRemoveSequence() {
    this.form.patchValue({sequenceId: null});

  }

  get outputCountParams(): SliderOptions {
    return outputCountParams;
  }

  get randoms() {
    return [
      {id: Random.OFF, name: 'EXPERIMENTS.EXPERIMENT.ERP.RANDOM.OFF'},
      {id: Random.SHORT, name: 'EXPERIMENTS.EXPERIMENT.ERP.RANDOM.SHORT'},
      {id: Random.LONG, name: 'EXPERIMENTS.EXPERIMENT.ERP.RANDOM.LONG'},
      {id: Random.SHORT_LONG, name: 'EXPERIMENTS.EXPERIMENT.ERP.RANDOM.SHORT_LONG'},
    ];
  }

  get edges() {
    return [
      {id: Edge.FALLING, name: 'EXPERIMENTS.EXPERIMENT.ERP.EDGE.FALLING'},
      {id: Edge.LEADING, name: 'EXPERIMENTS.EXPERIMENT.ERP.EDGE.LEADING'}
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
