import {
  EventEmitter,
  OnDestroy,
  OnInit,
  Directive,
  AfterContentInit,
  AfterContentChecked,
  AfterViewChecked,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { NGXLogger } from 'ngx-logger';

import { Experiment, ExperimentType, Output } from '@stechy1/diplomka-share';

import {
  ExperimentsFacade,
  ExperimentsState,
} from '@diplomka-frontend/stim-feature-experiments/domain';
import { NavigationFacade } from '@diplomka-frontend/stim-feature-navigation/domain';
import { ConnectionInformationState } from '@diplomka-frontend/stim-lib-connection';
import { AliveCheckerFacade } from '@diplomka-frontend/stim-lib-connection';

import { ExperimentNameValidator } from '../experiment-name-validator';
import { ComponentCanDeactivate } from '../experiments.deactivate';
import { ModalComponent } from '@diplomka-frontend/stim-lib-modal';
import { OutputEditorComponent } from './output-type/output-editor/output-editor.component';
import { ExperimentOutputTypeValidator } from './output-type/experiment-output-type-validator';
import { Options as SliderOptions } from 'ng5-slider/options';
import { outputCountParams } from '../experiments.share';

@Directive()
export abstract class BaseExperimentTypeComponent<
  E extends Experiment<O>,
  O extends Output
> implements OnInit, OnDestroy, ComponentCanDeactivate {
  private _experimentLoaded: EventEmitter<E> = new EventEmitter<E>();
  public experimentLoaded$: Observable<
    E
  > = this._experimentLoaded.asObservable();
  public form: FormGroup;
  private _experimentsStateSubscription: Subscription;

  protected constructor(
    protected readonly _maxOutputCount: number,
    protected readonly _facade: ExperimentsFacade,
    protected readonly _route: ActivatedRoute,
    protected readonly _navigation: NavigationFacade,
    private readonly _connection: AliveCheckerFacade,
    private readonly _nameValidator: ExperimentNameValidator,
    protected readonly logger: NGXLogger
  ) {
    this.form = new FormGroup(this._createFormControls());
  }

  /**
   * Obslužná metoda načtení experimentu podle ID
   *
   * @param experimentId ID experimentu
   */
  private _loadExperiment(experimentId: string) {
    if (experimentId !== undefined) {
      if (isNaN(parseInt(experimentId, 10))) {
        this.logger.error(
          `ID experimentu: '${experimentId}' se nepodařilo naparsovat!`
        );
        return;
      }

      this._facade.one(+experimentId);
    } else {
      this._facade.empty(this._createEmptyExperiment());
    }
  }

  /**
   * Pomocná privátní metoda pro aktualizaci formuláře
   *
   * @param experiment Experiment, který dodá data do formuláře
   */
  private _updateFormGroup(experiment: E) {
    this.logger.debug('Aktualizuji hodnoty ve formuláři.');

    if (experiment.outputs?.length > 0) {
      for (let i = 0; i < this._maxOutputCount; i++) {
        (this.form.get('outputs') as FormArray).push(
          new FormGroup(this._createOutputFormControl())
        );
      }
    } else {
      (this.form.get('outputs') as FormArray).clear();
    }

    this.form.patchValue(experiment);
    this.form.markAsUntouched();
  }

  /**
   * Pomocná abstraktní metoda pro vytvoření prázdné instance experimentu
   */
  protected abstract _createEmptyExperiment(): E;

  /**
   * Pomocný getter na instanci modální komponenty
   */
  protected get modalComponent(): ModalComponent {
    return null;
  }

  /**
   * Pomocná abstraktní metoda pro vytvoření formulářové skupiny komponent
   */
  protected _createFormControls(): { [p: string]: AbstractControl } {
    this.logger.debug('Vytvářím kontrolky pro formulář.');
    return {
      id: new FormControl(null),
      name: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [
          this._nameValidator.validate.bind(this._nameValidator),
        ],
        updateOn: 'blur',
      }),
      description: new FormControl(),
      type: new FormControl(null, [Validators.required]),
      created: new FormControl(null),
      tags: new FormControl([]),
      supportSequences: new FormControl(null, [Validators.required]),
    };
  }

  protected _createOutputFormControl(): { [p: string]: AbstractControl } {
    this.logger.debug('Vytvářím kontrolky výstupů pro formulář.');
    return {
      id: new FormControl(null, Validators.required),
      experimentId: new FormControl(null, Validators.required),
      orderId: new FormControl(null, [Validators.required, Validators.min(0)]),
      brightness: new FormControl(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      outputType: new FormGroup(
        {
          led: new FormControl(null),
          audio: new FormControl(null),
          audioFile: new FormControl(null),
          image: new FormControl(null),
          imageFile: new FormControl(null),
        },
        {
          validators: [
            Validators.required,
            ExperimentOutputTypeValidator.createValidator(),
          ],
        }
      ),
      x: new FormControl(),
      y: new FormControl(),
      width: new FormControl(),
      height: new FormControl(),
      manualAlignment: new FormControl(),
      horizontalAlignment: new FormControl(),
      verticalAlignment: new FormControl(),
    };
  }

  ngOnInit(): void {
    this._experimentsStateSubscription = this._facade.state
      .pipe(take(2))
      .pipe(
        map((state: ExperimentsState) => state.selectedExperiment.experiment)
      )
      .subscribe((experiment: Experiment<O>) => {
        this._updateFormGroup(experiment as E);
        this._navigation.customNavColor = ExperimentType[
          experiment.type
        ].toLowerCase();
        setTimeout(() => {
          this._experimentLoaded.next(experiment as E);
        }, 100);
      });

    this._route.params.subscribe((params: Params) => {
      this._loadExperiment(params['id']);
    });
  }

  ngOnDestroy(): void {
    this._experimentsStateSubscription.unsubscribe();
    this._facade.empty(this._createEmptyExperiment());
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
    this._facade.save(this.form.value);
  }

  /**
   * Reakce na tlačítko pro zobrazení editoru výstupů
   */
  public handleShowOutputEditor() {
    this.modalComponent.showComponent = OutputEditorComponent;
    this.modalComponent.open({
      outputs: this.form.value.outputs,
    });
  }

  get experimentsState(): Observable<ExperimentsState> {
    return this._facade.state;
  }

  get connectionState(): Observable<ConnectionInformationState> {
    return this._connection.state;
  }

  get outputCountParams(): SliderOptions {
    return outputCountParams(this._maxOutputCount);
  }

  get outputCount() {
    return this.form.get('outputCount');
  }
}
