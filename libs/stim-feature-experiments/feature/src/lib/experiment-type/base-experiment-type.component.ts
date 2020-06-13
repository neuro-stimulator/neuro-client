import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { NGXLogger } from 'ngx-logger';

import { Experiment, ExperimentType } from "@stechy1/diplomka-share";

import { ExperimentsFacade, ExperimentsState } from '@diplomka-frontend/stim-feature-experiments/domain';
import { NavigationFacade } from "@diplomka-frontend/stim-feature-navigation/domain";
import { ConnectionInformationState } from "@diplomka-frontend/stim-lib-connection";
import { AliveCheckerFacade } from "@diplomka-frontend/stim-lib-connection";

import { ExperimentNameValidator } from '../experiment-name-validator';
import { ComponentCanDeactivate } from '../experiments.deactivate';

export abstract class BaseExperimentTypeComponent<E extends Experiment> implements OnInit, OnDestroy, ComponentCanDeactivate {

  // protected _experiment: E;
  private _experimentLoaded: EventEmitter<E> = new EventEmitter<E>();
  public experimentLoaded$: Observable<E> = this._experimentLoaded.asObservable();
  public form: FormGroup;
  // private _connectedSubscription: Subscription;
  // private _workingSubscription: Subscription;
  private _experimentsStateSubscription: Subscription;
  // private _isNew = true;

  protected constructor(protected readonly _service: ExperimentsFacade,
                        // protected readonly toastr: ToastrService,
                        // protected readonly _router: Router,
                        protected readonly _route: ActivatedRoute,
                        protected readonly _navigation: NavigationFacade,
                        private readonly _connection: AliveCheckerFacade,
                        private readonly _nameValidator: ExperimentNameValidator,
                        protected readonly logger: NGXLogger) {
    this.form = new FormGroup(this._createFormControls());
  }

  /**
   * Obslužná metoda načtení experimentu podle ID
   *
   * @param experimentId ID experimentu
   */
  private _loadExperiment(experimentId: string) {
    // this._experiment = this._createEmptyExperiment();
    // this._experiment.outputCount = environment.maxOutputCount;

    if (experimentId !== undefined) {
      if (isNaN(parseInt(experimentId, 10))) {
        // this.logger.error(`ID experimentu: '${experimentId}' se nepodařilo naparsovat!`);
        // this.toastr.error(`ID experimentu: '${experimentId}' se nepodařilo naparsovat!`);
        // this._router.navigate(['/', 'experiments']);
        return;
      }

      this._service.one(+experimentId);
    //
    //   this._isNew = false;
    //   this._experiment.id = +experimentId;
    // }
    // this._updateFormGroup(this._experiment);
    // this._experiment.type = ExperimentType.NONE;

    // if (experimentId !== undefined) {
    //   this._service.one(+experimentId)
    //       .catch((error) => {
    //         // Pokud nenastane timeout => experiment nebyl na serveru nalezen
    //         if (!(error instanceof TimeoutError)) {
    //           // Rovnou přesmeruji na seznam všech experimentů
    //           this.logger.error('Vyskytl se problém s načítáním experimentu... Přesmerovávám na výčet všech experimentů!');
    //           this._router.navigate(['/', 'experiments']);
    //         }
    //
    //         // Nastal timeout
    //         // vrátím existující prázdný experiment a přihlásím se k socketu na událost
    //         // pro obnovení spojení
    //         this._connectedSubscription = this._service.connected$.subscribe(() => {
    //           this._connectedSubscription.unsubscribe();
    //           this._loadExperiment(experimentId);
    //         });
    //         return this._experiment;
    //       })
    //       .then((experiment: E) => {
    //         this.logger.info(`Budu zobrazovat konfiguraci experimentu s ID: ${experiment.id}.`);
    //         this._experiment = experiment;
    //         this._updateFormGroup(this._experiment);
    //         this._navigation.customNavColor.next(ExperimentType[experiment.type].toLowerCase());
    //         this._experimentLoaded.next(experiment);
    //         // Nepříjemný hack, který mi zajistí,
    //         // že formulář bude vykazovat známky netknutosti i po nastavení všech
    //         // hodnot
    //         setTimeout(() => {
    //           this.form.markAsUntouched();
    //         }, 100);
    //       });
    } else {
      this._service.empty(this._createEmptyExperiment());
    }
  }

  /**
   * Pomocná privátní metoda pro aktualizaci formuláře
   *
   * @param experiment Experiment, který dodá data do formuláře
   */
  protected _updateFormGroup(experiment: E) {
    this.logger.debug('Aktualizuji hodnoty ve formuláři.');
    this.form.patchValue(experiment);
    this.form.markAsUntouched();
  }

  /**
   * Pomocná abstraktní metoda pro vytvoření prázdné instance experimentu
   */
  protected abstract _createEmptyExperiment(): E;

  /**
   * Pomocná abstraktní metoda pro vytvoření formulářové skupiny komponent
   */
  protected _createFormControls(): { [p: string]: AbstractControl } {
    this.logger.debug('Vytvářím kontrolky pro formulář.');
    return {
      id: new FormControl(null),
      name: new FormControl(null,
        {validators: [Validators.required],
          asyncValidators: [this._nameValidator.validate.bind(this._nameValidator)],
          updateOn: 'blur'}),
      description: new FormControl(),
      type: new FormControl(null, [Validators.required]),
      created: new FormControl(null),
      tags: new FormControl([])
    };
  }

  ngOnInit(): void {
    this._experimentsStateSubscription = this._service.state
                                             .pipe(map((state: ExperimentsState) => state.selectedExperiment.experiment))
                                             .subscribe((experiment: Experiment) => {
                                               this._updateFormGroup(experiment as E);
                                               this._experimentLoaded.next(experiment as E);
                                               this._navigation.customNavColor = ExperimentType[experiment.type].toLowerCase();
                                               // this._navigation.customNavColor.next(ExperimentType[experiment.type].toLowerCase());
                                             });
    // this._experimentsStateSubscription = this._service.experimentsState.subscribe((experimentsState: ExperimentsStateType) => {
    //   this._experimentLoaded.next(experimentsState.selectedExperiment.experiment as E);
    // });
    this._route.params.subscribe((params: Params) => {
      // Tento timeout tu bohužel musí být
      // Řeší mi problém "Expression has changed after it was checked."
      // setTimeout(() => {
        this._loadExperiment(params['id']);
      // }, 10);
    });
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
    this._experimentsStateSubscription.unsubscribe();
    // if (this._connectedSubscription) {
    //   this._connectedSubscription.unsubscribe();
    // }
    // this._workingSubscription.unsubscribe();
  }

  canDeactivate(): Observable<boolean> | boolean {
    // Dočasné zakázání tétu funkcionality, dokud nenajdu
    // fungující řešení
    return true;
    // return (!(this.form.dirty && this.form.touched));
  }

  /**
   * Reakce na tlačítko pro uložení dat experimentu
   */
  public handleSaveExperiment() {
    this._service.save(this.form.value);
    // if (this._experiment.id === undefined) {
    //   this._service.insert(this.form.value)
    //       .then((experiment: E) => {
    //         this.logger.info(`Zakládám nový experiment s id: ${experiment.id}`);
    //         this._experiment = experiment;
    //         // Po úspěšném založení nového experimentu,
    //         // upravím adresní řádek tak, aby obsahoval ID experimentu
    //         this._router.navigate(['/', 'experiments', ExperimentType[experiment.type].toLowerCase(), experiment.id], {replaceUrl: true });
    //       });
    // } else {
    //   this.logger.info(`Aktualizuji experiment s id: ${this._experiment.id}`);
    //   this._service.update(this.form.value)
    //       .then((experiment: Experiment) => {
    //         this.form.reset(experiment);
    //       });
    // }
  }

  // public get experiment(): E {
  //   return this._experiment;
  // }

  // get working() {
    // return this._service.working$;
  // }

  get experimentsState(): Observable<ExperimentsState> {
    return this._service.state;
  }

  get connectionState(): Observable<ConnectionInformationState> {
    return this._connection.state;
  }
}
