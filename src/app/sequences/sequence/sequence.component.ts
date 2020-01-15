import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable, Subscription, TimeoutError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';

import { SequenceService } from '../sequence.service';
import { Experiment, Sequence} from '@stechy1/diplomka-share';
import { createEmptyExperimentERP } from '@stechy1/diplomka-share/lib/experiments';
import { createEmptySequence } from '@stechy1/diplomka-share/lib/sequence';
import { ExperimentsService } from '../../experiments/experiments.service';

@Component({
  selector: 'app-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.sass']
})
export class SequenceComponent implements OnInit, OnDestroy {

  form: FormGroup = new FormGroup({
    id: new FormControl(),
    experimentId: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    size: new FormControl(null, [Validators.required, Validators.min(1)]),
    data: new FormControl(null, [Validators.required]),
    created: new FormControl(),
    tags: new FormControl([])
  });

  private readonly _sequenceData: EventEmitter<{data: number[], analyse: {}}> = new EventEmitter<{data: number[], analyse: {}}>();
  public readonly sequenceData$: Observable<{data: number[], analyse: {}}> = this._sequenceData.asObservable();

  private readonly _experiments: EventEmitter<Experiment[]> = new EventEmitter<Experiment[]>();
  public readonly experiments$: Observable<Experiment[]> = this._experiments.asObservable();

  private readonly _outputCount: EventEmitter<number> = new EventEmitter<number>();
  public readonly outputCount$: Observable<number> = this._outputCount.asObservable();

  private _sequence: Sequence;
  private _experiment: Experiment;
  private _connectedSubscription: Subscription;
  private _workingSubscription: Subscription;

  private _originalSequenceId: number;
  private _originalExperimentId: number;
  private _originalSequenceSize: number;

  actualIsOriginal = true;

  constructor(private readonly _service: SequenceService,
              private readonly _experimetnService: ExperimentsService,
              private readonly toastr: ToastrService,
              private readonly _router: Router,
              private readonly _route: ActivatedRoute,
              private readonly logger: NGXLogger) {
    this._experiment = createEmptyExperimentERP();
  }

  private _loadSequence(sequenceID: string) {
    this._sequence = createEmptySequence();
    this.form.patchValue(this._sequence);

    if (sequenceID !== undefined) {
      if (isNaN(parseInt(sequenceID, 10))) {
        this.toastr.error(`ID sequence: '${sequenceID}' se nepodařilo naparsovat!`);
        this._router.navigate(['/sequences']);
        return;
      }

      this._sequence.id = +sequenceID;

      this._service.oneWithAnalyse(+sequenceID)
          .catch(error => {
            // Pokud nenastane timeout => sequence nebyla na serveru nalezena
            if (!(error instanceof TimeoutError)) {
              // Rovnou přesmeruji na seznam všech sequenci
              this._router.navigate(['/sequences']);
            }

            // Nastal timeout
            // vrátím existující prázdnou sequenci a přihlásím se k socketu na událost
            // pro obnovení spojení
            this._connectedSubscription = this._service.connected$.subscribe(() => {
              this._connectedSubscription.unsubscribe();
              this._loadSequence(sequenceID);
            });
            return {sequence: this._sequence, analyse: {}};
          })
          .then((result: {sequence: Sequence, analyse: {}}) => {
            this._sequence = result.sequence;
            this._originalSequenceId = this._sequence.id;
            this._originalExperimentId = this._sequence.experimentId;
            this._originalSequenceSize = this._sequence.size;
            this.actualIsOriginal = true;
            this.form.patchValue(this._sequence);
            this._sequenceData.next({ data: this._sequence.data, analyse: result.analyse });
            this._loadExperiment(this._sequence.experimentId);
          });
    }
  }

  private _loadExperiment(experimentID: number) {
    if (this._originalExperimentId !== experimentID) {
      this.actualIsOriginal = false;
    }
    this._experimetnService.one(experimentID)
        .then(experiment => {
          this._experiment = experiment;
          this._outputCount.next(this._experiment.outputCount);
        });
  }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this._loadSequence(params['id']);
    });
    this._route.queryParams.subscribe((query: Params) => {
      if (query['sourceExperimentId']) {
        this.form.patchValue({experimentId: query['sourceExperimentId']});
        this._loadExperiment(query['sourceExperimentId']);
      }
    });

    this._service.experimentsAsSequenceSource()
        .then(experiments => {
          this._experiments.next(experiments);
        });

    this._workingSubscription = this.working.subscribe(working => {
      if (working) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    });
  }

  ngOnDestroy(): void {
    if (this._connectedSubscription) {
      this._connectedSubscription.unsubscribe();
    }
    this._workingSubscription.unsubscribe();
  }

  handleGenerateSequence() {
    this._service.generaceSequence(this.experimentId.value, this.size.value || 50)
        .then((result: {data: number[], analyse: {}}) => {
          this.form.patchValue({data: result.data});
          this._sequenceData.next(result);
        });
  }

  handleSaveSequence() {
    if (this._sequence.id === undefined) {
      this._service.insert(this.form.value)
          .then((sequence: Sequence) => {
            this.logger.info(`Zakládám novou sequence s id: ${sequence.id}`);
            this._sequence = sequence;
            // Po úspěšném založení nové sequenceu,
            // upravím adresní řádek tak, aby obsahoval ID sequence
            this._router.navigate(['/', 'sequences', sequence.id], {replaceUrl: true });
          });
    } else {
      this.logger.info(`Aktualizuji sequenci s id: ${this._sequence.id}`);
      this._service.update(this.form.value);
    }
  }

  handleSourceExperimentChange(event: Event) {
    this.data.setValue(null);
    this._sequenceData.next({ data: [], analyse: {}});
    const id = (event.target as HTMLInputElement).value;
    this._loadExperiment(+id);
  }

  handleSequenceSizeChange(event: Event) {
    const size = +(event.target as HTMLInputElement).value;
    if (this._originalSequenceSize !== size) {
      this.actualIsOriginal = false;
    }
  }

  handleShowOriginalSequence() {
    this.form.patchValue({experimentId: this._originalExperimentId, size: this._originalSequenceSize});
    this._loadSequence(`${this._originalSequenceId}`);
  }

  get working(): Observable<boolean> {
    return this._service.working$;
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
}
