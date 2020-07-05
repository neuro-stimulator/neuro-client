import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Observable, of, Subscription, TimeoutError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';

import {
  createEmptyExperimentERP,
  createEmptySequence,
  Experiment,
  ExperimentType,
  Sequence,
} from '@stechy1/diplomka-share';

import { SequenceNameValidator } from '../sequence-name-validator';
import {
  SequencesFacade,
  SequencesState,
} from '@diplomka-frontend/stim-feature-sequences/domain';
import {
  ExperimentsFacade,
  ExperimentsState,
} from '@diplomka-frontend/stim-feature-experiments/domain';
import { map, take } from 'rxjs/operators';
import {
  AliveCheckerFacade,
  ConnectionInformationState,
} from '@diplomka-frontend/stim-lib-connection';

@Component({
  selector: 'stim-feature-sequences-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.sass'],
})
export class SequenceComponent implements OnInit, OnDestroy {
  private readonly _nameValidator = new SequenceNameValidator(this._facade);

  form: FormGroup = new FormGroup({
    id: new FormControl(),
    experimentId: new FormControl(null, [
      Validators.required,
      Validators.min(1),
    ]),
    name: new FormControl(null, {
      validators: [Validators.required],
      asyncValidators: [this._nameValidator.validate.bind(this._nameValidator)],
      updateOn: 'blur',
    }),
    size: new FormControl(null, [Validators.required, Validators.min(1)]),
    data: new FormControl(null, [Validators.required]),
    created: new FormControl(),
    tags: new FormControl([]),
  });

  ExperimentType: ExperimentType;

  constructor(
    private readonly _facade: SequencesFacade,
    private readonly _experimentService: ExperimentsFacade,
    private readonly toastr: ToastrService,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _connection: AliveCheckerFacade,
    private readonly logger: NGXLogger
  ) {}

  private _loadSequence(sequenceID: string) {
    if (sequenceID !== undefined) {
      if (isNaN(parseInt(sequenceID, 10))) {
        this.toastr.error(
          `ID sequence: '${sequenceID}' se nepodařilo naparsovat!`
        );
        return;
      }

      this._facade.one(+sequenceID);
    } else {
      this._facade.empty(createEmptySequence());
    }

    this._facade.experimentsAsSequenceSource();
  }

  private _loadExperiment(experimentID: number) {
    // if (this._originalExperimentId !== experimentID) {
    //   this.actualIsOriginal = false;
    // }
    // this._experimentService.one(experimentID)
    //     .then((experiment: Experiment) => {
    //       this._experiment = experiment;
    //       this._outputCount.next(this._experiment.outputCount);
    //     });
  }

  /**
   * Pomocná privátní metoda pro aktualizaci formuláře
   *
   * @param sequence Sequence, která dodá data do formuláře
   */
  protected _updateFormGroup(sequence: Sequence) {
    this.logger.debug('Aktualizuji hodnoty ve formuláři.');
    this.form.patchValue(sequence);
    this.form.markAsUntouched();
  }

  ngOnInit() {
    this._facade.state
      .pipe(take(2))
      .pipe(map((state: SequencesState) => state.selectedSequence.sequence))
      .subscribe((sequence: Sequence) => {
        this._updateFormGroup(sequence);
      });
    this._facade.state
      .pipe(
        map((state: SequencesState) => state.selectedSequence.sequence?.data)
      )
      .subscribe((data: number[]) => {
        this.form.patchValue({ data });
      });

    this._route.params.subscribe((params: Params) => {
      this._loadSequence(params['id']);
    });
    // this._route.queryParams.subscribe((query: Params) => {
    //   if (query['sourceExperimentId']) {
    //     this.form.patchValue({experimentId: query['sourceExperimentId']});
    //     this._loadExperiment(query['sourceExperimentId']);
    //   }
    // });
    //
    // this._facade.experimentsAsSequenceSource()
    //     .then((experiments: Experiment[]) => {
    //       this._experiments.next(experiments);
    //     });
    //
    // this._workingSubscription = this.working.subscribe((working: boolean) => {
    //   if (working) {
    //     this.form.disable();
    //   } else {
    //     this.form.enable();
    //   }
    // });
  }

  ngOnDestroy(): void {
    // if (this._connectedSubscription) {
    //   this._connectedSubscription.unsubscribe();
    // }
    // this._workingSubscription.unsubscribe();
  }

  handleGenerateSequence() {
    this._facade.generateSequence(this.form.value);
    // this._facade.generaceSequence(this.experimentId.value, this.size.value);
    // .then((result: number[]) => {
    //   this.form.patchValue({data: result});
    //   this._sequenceData.next({data: result, overrideOrigin: false});
    // });
  }

  handleSaveSequence() {
    this._facade.save(this.form.value);
    // if (this._sequence.id === undefined) {
    //   this._facade.insert(this.form.value)
    //       .then((sequence: Sequence) => {
    //         this.logger.info(`Zakládám novou sequenci s id: ${sequence.id}`);
    //         this._sequence = sequence;
    //         // Po úspěšném založení nové sequenceu,
    //         // upravím adresní řádek tak, aby obsahoval ID sequence
    //         this._router.navigate(['/', 'sequences', sequence.id], {replaceUrl: true });
    //       });
    // } else {
    //   this.logger.info(`Aktualizuji sequenci s id: ${this._sequence.id}`);
    //   this._facade.update(this.form.value).then((value: Sequence) => {
    //     this.actualIsOriginal = true;
    //   });
    // }
  }

  handleSourceExperimentChange(event: Event) {
    // this.data.setValue(null);
    // this._sequenceData.next({data: [], overrideOrigin: false});
    // const id = (event.target as HTMLInputElement).value;
    // this._loadExperiment(+id);
  }

  handleSequenceSizeChange(event: Event) {
    // const size = +(event.target as HTMLInputElement).value;
    // if (this._originalSequenceSize !== size) {
    //   this.actualIsOriginal = false;
    // }
  }

  handleShowOriginalSequence() {
    this._facade.originalSequenceAsActual();
    // this.form.patchValue({experimentId: this._originalExperimentId, size: this._originalSequenceSize});
    // this._loadSequence(`${this._originalSequenceId}`);
  }

  handleSequenceUpdate(data: number[]) {
    this.form.patchValue({ data });
    if (this.form.valid) {
      this.handleSaveSequence();
    }
  }

  handleSequenceChanged(changed: boolean) {
    // this.actualIsOriginal = changed;
  }

  get name(): AbstractControl {
    return this.form.get('name');
  }

  get size(): AbstractControl {
    return this.form.get('size');
  }

  get experimentId(): AbstractControl {
    return this.form.get('experimentId');
  }

  get data(): AbstractControl {
    return this.form.get('data');
  }

  get isNew(): boolean {
    return !this.form.get('id').value;
  }

  get sequencesState(): Observable<SequencesState> {
    return this._facade.state;
  }

  get connectionState(): Observable<ConnectionInformationState> {
    return this._connection.state;
  }
}
