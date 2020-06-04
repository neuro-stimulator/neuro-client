import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { NGXLogger } from 'ngx-logger';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, TimeoutError } from 'rxjs';

import { createEmptyExperiment, createEmptyExperimentResult, ExperimentResult, ExperimentType, IOEvent } from '@stechy1/diplomka-share';

import { environment} from '../../../environments/environment';
import { NavigationService } from '../../navigation/navigation.service';
import { ExperimentResultsService } from '../experiment-results.service';

@Component({
  selector: 'stim-experiment-result',
  templateUrl: './experiment-result.component.html',
  styleUrls: ['./experiment-result.component.sass']
})
export class ExperimentResultComponent implements OnInit, OnDestroy {

  private _experimentResult: ExperimentResult;
  private _connectedSubscription: Subscription;
  private readonly _incommingEvent: EventEmitter<IOEvent> = new EventEmitter<IOEvent>();

  incommingEvent: Observable<IOEvent> = this._incommingEvent.asObservable();
  outputCount: number = environment.maxOutputCount;

  public form: FormGroup = new FormGroup({
    id: new FormControl(),
    experimentID: new FormControl(),
    type: new FormControl(),
    outputCount: new FormControl(),
    name: new FormControl(),
    date: new FormControl(),
    filename: new FormControl(),
  });

  constructor(private readonly _service: ExperimentResultsService,
              private readonly toastr: ToastrService,
              private readonly logger: NGXLogger,
              private readonly _router: Router,
              private readonly _route: ActivatedRoute,
              private readonly _navigation: NavigationService) {
  }

  private _loadExperimentResult(experimentResultId: string) {
    this._experimentResult = createEmptyExperimentResult(createEmptyExperiment());

    if (experimentResultId !== undefined) {
      if (isNaN(parseInt(experimentResultId, 10))) {
        this.toastr.error(`ID výsledku experimentu: '${experimentResultId}' se nepodařilo naparsovat!`);
        this._router.navigate(['/', 'results']);
        return;
      }

      this._experimentResult.id = +experimentResultId;

      this._service.one(+experimentResultId)
          .catch((error) => {
            // Pokud nenastane timeout => výsledek experimentu nebyl na serveru nalezen
            if (!(error instanceof TimeoutError)) {
              // Rovnou přesmeruji na seznam všech výsledků experimentů
              this._router.navigate(['/', 'results']);
            }

            // Nastal timeout
            // vrátím existující prázdný výsledek experimentu a přihlásím se k socketu na událost
            // pro obnovení spojení
            this._connectedSubscription = this._service.connected$.subscribe(() => {
              this._connectedSubscription.unsubscribe();
              this._loadExperimentResult(experimentResultId);
            });
            return this._experimentResult;
          })
          .then((experimentResult: ExperimentResult) => {
            this._experimentResult = experimentResult;
            this.outputCount = experimentResult.outputCount;
            this._navigation.customNavColor.next(ExperimentType[experimentResult.type].toLowerCase());
            if (experimentResult.experimentID === -1) {
              return;
            }

            this.form.setValue(experimentResult);
            this._service.resultData(experimentResult)
                .then((resultData: IOEvent[]) => {
                  for (const data of resultData) {
                    this._incommingEvent.next(data);
                  }
                });
          });
    }
  }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this._loadExperimentResult(params['id']);
    });
  }

  ngOnDestroy(): void {
    if (this._connectedSubscription) {
      this._connectedSubscription.unsubscribe();
    }
  }

  handleSaveExperimentResult() {
    this.logger.info(`Aktualizuji výsledek experimentu s id: ${this._experimentResult.id}`);
    this._service.update(this.form.value);
  }

  get working() {
    return this._service.working$;
  }

  get name() {
    return this.form.get('name');
  }

  get dataLink(): string {
    return this._service.dataLink + this._experimentResult.id;
  }
}
