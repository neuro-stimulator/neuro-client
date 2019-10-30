import { OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { ExperimentsService } from '../experiments.service';
import { Experiment, ExperimentType } from 'diplomka-share';

export abstract class BaseExperimentTypeComponent<E extends Experiment> implements OnInit {

  protected _experiment: E;
  public form: FormGroup;

  protected constructor(protected readonly _service: ExperimentsService,
                        protected readonly _router: Router,
                        protected readonly _route: ActivatedRoute,
                        protected readonly _location: Location) {
      this.form = new FormGroup(this._createFormControls());
  }

  /**
   * Obslužná metoda pro zpracování URL parametrů
   *
   * @param params URL parametry
   */
  private _handleRouteParams(params: Params) {
    const experimentId: string = params['id'];
    this._experiment = this._createEmptyExperiment();

    try {
      parseInt(experimentId, 10);
    } catch (ex) {
      console.log(ex);
      return;
    }

    if (experimentId !== undefined) {
      this._experiment.id = +experimentId;
    }
    this._updateFormGroup(this._experiment);

    if (experimentId !== undefined) {
      this._service.one(+experimentId)
          .then((experiment: E) => {
            this._experiment = experiment;
            this._updateFormGroup(this._experiment);
          });
    }
  }

  /**
   * Pomocná privátní metoda pro aktualizaci formuláře
   *
   * @param experiment Experiment, který dodá data do formuláře
   */
  private _updateFormGroup(experiment: E) {
    this.form.patchValue(experiment);
  }

  /**
   * Pomocná abstraktní metoda pro vytvoření prázdné instance experimentu
   */
  protected abstract _createEmptyExperiment(): E;

  /**
   * Pomocná abstraktní metoda pro vytvoření formulářové skupiny komponent
   */
  protected _createFormControls(): {[p: string]: AbstractControl} {
    return {
      id: new FormControl(),
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(),
      type: new FormControl(),
      created: new FormControl(),
      output: new FormGroup({
        led: new FormControl(),
        image: new FormControl(),
        sound: new FormControl()
      })
    };
  }

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this._handleRouteParams(params);
    });
  }

  /**
   * Reakce na tlačítko pro uložení dat experimentu
   */
  public handleSaveExperiment() {
    if (this._experiment.id === undefined) {
      this._service.insert(this.form.value)
          .then((experiment: E) => {
            this._experiment = experiment;
            // Po úspěšném založení nového experimentu,
            // upravím adresní řádek tak, aby obsahoval ID experimentu
            this._location.replaceState(this._router.serializeUrl(this._router.createUrlTree(
              ['/', 'experiments', ExperimentType[experiment.type].toLowerCase(), experiment.id])
            ));
          });
    } else {
      this._service.update(this.form.value);
    }
  }

  public get experiment(): E {
    return this._experiment;
  }

}
