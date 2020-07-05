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
  }

  ngOnDestroy(): void {
    // if (this._connectedSubscription) {
    //   this._connectedSubscription.unsubscribe();
    // }
    // this._workingSubscription.unsubscribe();
  }

  handleGenerateSequence() {
    this._facade.generateSequence(this.form.value);
  }

  handleSaveSequence() {
    this._facade.save(this.form.value);
  }

  handleShowOriginalSequence() {
    this._facade.originalSequenceAsActual();
  }

  handleSequenceUpdate(data: number[]) {
    this.form.patchValue({ data });
    if (this.form.valid) {
      this.handleSaveSequence();
    }
  }

  handleSequenceChanged(changed: boolean) {}

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
