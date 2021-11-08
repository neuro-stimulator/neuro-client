import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { NGXLogger } from 'ngx-logger';
import { ToastrService } from 'ngx-toastr';

import {
  ExperimentResultsFacade,
  ExperimentResultsState,
} from '@neuro-client/stim-feature-experiment-results/domain';
import { NavigationFacade } from '@neuro-client/stim-feature-navigation/domain';
import {
  createEmptyExperiment,
  createEmptyExperimentResult,
  ExperimentResult,
  ExperimentType,
} from '@stechy1/diplomka-share';
import { map } from 'rxjs/operators';
import {
  AliveCheckerFacade,
  ConnectionInformationState,
} from '@neuro-client/stim-lib-connection';
import {
  TOKEN_EXPERIMENT_RESULTS_API_URL,
  TOKEN_MAX_OUTPUT_COUNT,
} from '@neuro-client/stim-lib-common';

@Component({
  selector: 'stim-feature-experiment-results-experiment-result',
  templateUrl: './experiment-result.component.html',
  styleUrls: ['./experiment-result.component.sass'],
})
export class ExperimentResultComponent implements OnInit, OnDestroy {
  // private _experimentResult: ExperimentResult;
  // private _connectedSubscription: Subscription;
  // private readonly _incommingEvent: EventEmitter<IOEvent> = new EventEmitter<IOEvent>();

  // incommingEvent: Observable<IOEvent> = this._incommingEvent.asObservable();
  outputCount: number = this._maxOutputCount;

  public form: FormGroup = new FormGroup({
    id: new FormControl(),
    experimentID: new FormControl(),
    type: new FormControl(),
    outputCount: new FormControl(),
    name: new FormControl(),
    date: new FormControl(),
    filename: new FormControl(),
  });
  private _experimentResultsStateSubscription: Subscription;

  constructor(
    @Inject(TOKEN_EXPERIMENT_RESULTS_API_URL) private readonly apiURL: string,
    @Inject(TOKEN_MAX_OUTPUT_COUNT) private readonly _maxOutputCount: number,
    private readonly _service: ExperimentResultsFacade,
    private readonly toastr: ToastrService,
    private readonly logger: NGXLogger,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _navigation: NavigationFacade,
    private readonly _connection: AliveCheckerFacade
  ) {}

  private _loadExperimentResult(experimentResultId: string) {
    if (experimentResultId !== undefined) {
      if (isNaN(parseInt(experimentResultId, 10))) {
        this.toastr.error(
          `ID výsledku experimentu: '${experimentResultId}' se nepodařilo naparsovat!`
        );
        this._router.navigate(['/', 'results']);
        return;
      }

      this._service.one(+experimentResultId);
    } else {
      this._service.empty(createEmptyExperimentResult(createEmptyExperiment()));
    }
  }

  ngOnInit() {
    this._experimentResultsStateSubscription = this._service.state
      .pipe(
        map(
          (state: ExperimentResultsState) =>
            state.selectedExperimentResult.experimentResult
        )
      )
      .subscribe((experimentResult: ExperimentResult) => {
        this.form.patchValue(experimentResult);
        this._navigation.customNavColor = ExperimentType[
          experimentResult.type
        ].toLowerCase();
      });

    this._route.params.subscribe((params: Params) => {
      this._loadExperimentResult(params['id']);
    });
  }

  ngOnDestroy(): void {
    this._experimentResultsStateSubscription.unsubscribe();
    // if (this._connectedSubscription) {
    //   this._connectedSubscription.unsubscribe();
    // }
  }

  handleSaveExperimentResult() {
    // this.logger.info(`Aktualizuji výsledek experimentu s id: ${this._experimentResult.id}`);
    this._service.update(this.form.value);
  }

  // get working() {
  //   return this._service.working$;
  // }

  get name() {
    return this.form.get('name');
  }

  get dataLink(): string {
    // TODO datalink
    return this.apiURL + '/result-data/';
    // return this._service.dataLink + this._experimentResult.id;
  }

  get state(): Observable<ExperimentResultsState> {
    return this._service.state;
  }

  get connectionState(): Observable<ConnectionInformationState> {
    return this._connection.state;
  }
}
