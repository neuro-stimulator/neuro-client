import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { combineLatest, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';

import { createEmptySequence, ExperimentType, Sequence } from '@stechy1/diplomka-share';

import { SequenceNameValidator } from '../sequence-name-validator';
import { SequencesFacade, SequencesState } from '@neuro-client/stim-feature-sequences/domain';
import { ExperimentsFacade } from '@neuro-client/stim-feature-experiments/domain';
import { map, take } from 'rxjs/operators';
import { AliveCheckerFacade, ConnectionInformationState } from '@neuro-client/stim-lib-connection';

@Component({
  selector: 'stim-feature-sequences-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.sass'],
})
export class SequenceComponent implements OnInit {
  private readonly _nameValidator = new SequenceNameValidator(this._facade);

  form: FormGroup = new FormGroup({
    id: new FormControl(),
    experimentId: new FormControl(null, [Validators.required, Validators.min(1)]),
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

  private _loadSequence(sequenceID: string, sourceExperimentId?: string, defaultSequenceSize?: string) {
    if (sequenceID !== undefined) {
      if (isNaN(parseInt(sequenceID, 10))) {
        this.toastr.error(`ID sequence: '${sequenceID}' se nepodařilo naparsovat!`);
        return;
      }

      this._facade.one(+sequenceID);
    } else {
      const sequence = createEmptySequence();
      sequence.experimentId = +sourceExperimentId;
      sequence.size = +defaultSequenceSize || 0;
      this._facade.empty(sequence);
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
    this.form.patchValue({ tags: [...sequence.tags] }, { emitEvent: false });
    this.form.markAsUntouched();
  }

  ngOnInit() {
    this._facade.state
      .pipe(take(2))
      .pipe(map((state: SequencesState) => state.selectedSequence.sequence))
      .subscribe((sequence: Sequence) => {
        this._updateFormGroup(sequence);
      });
    this._facade.state.pipe(map((state: SequencesState) => state.selectedSequence.sequence?.data)).subscribe((data: number[]) => {
      this.form.patchValue({ data });
    });

    combineLatest([this._route.params, this._route.queryParams]).subscribe(([params, queryParams]: [Params, Params]) => {
      this._loadSequence(params['id'], queryParams['sourceExperimentId'], queryParams['defaultSequenceSize']);
    });
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

  handleSequenceChanged(changed: boolean) {
    // empty body
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
