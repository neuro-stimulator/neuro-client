import { OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ExperimentsService } from '../experiments.service';
import { Experiment } from 'diplomka-share';
import { FormGroup } from '@angular/forms';

export abstract class BaseExperimentTypeComponent<E extends Experiment> implements OnInit {

  protected _experiment: E;
  public form: FormGroup;

  protected constructor(protected readonly _service: ExperimentsService,
                        protected readonly route: ActivatedRoute) {
      this.form = this._createFormGroup();
  }

  /**
   * Obslužná metoda pro zpracování URL parametrů
   *
   * @param params URL parametry
   */
  private _handleRouteParams(params: Params) {
    const experimentId: string = params['id'];
    if (experimentId === undefined) {
      this._experiment = this._createEmptyExperiment();
      this._updateFormGroup(this._experiment);
      return;
    }

    try {
      parseInt(experimentId, 10);
    } catch (ex) {
      console.log(ex);
      return;
    }
    this._service.one(+experimentId)
        .then((experiment: E) => {
          this._experiment = experiment;
          this._updateFormGroup(this._experiment);
        });
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
  protected _createFormGroup(): FormGroup {
    return new FormGroup({});
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this._handleRouteParams(params);
    });
  }

  /**
   * Reakce na tlačítko pro uložení dat experimentu
   */
  public handleSaveExperiment() {
    if (this._experiment.id === undefined) {
      this._service.insert(this._experiment);
    } else {
      this._service.update(this._experiment);
    }
  }

  public get experiment(): E {
    return this._experiment;
  }

}
