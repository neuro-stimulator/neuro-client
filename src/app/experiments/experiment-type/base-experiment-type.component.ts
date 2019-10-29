import { OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ExperimentsService } from '../experiments.service';
import { Experiment } from 'diplomka-share';

export abstract class BaseExperimentTypeComponent implements OnInit {

  protected _experiment: Experiment;

  protected constructor(protected readonly _service: ExperimentsService,
                        protected readonly route: ActivatedRoute) {
  }

  private _handleRouteParams(params: Params) {
    const experimentId: string = params['id'];
    if (experimentId === 'new') {
      this._experiment = this._createEmptyExperiment();
      return;
    }

    try {
      parseInt(experimentId, 10);
    } catch (ex) {
      console.log(ex);
      return;
    }
    this._service.one(+experimentId)
        .then((experiment: Experiment) => {
          this._experiment = experiment;
        });
  }

  protected abstract _createEmptyExperiment(): Experiment;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this._handleRouteParams(params);
    });
  }

  public handleSaveExperiment() {
    if (this._experiment.id === undefined) {
      this._service.insert(this._experiment);
    } else {
      this._service.update(this._experiment);
    }
  }

  public get experiment(): Experiment {
    return this._experiment;
  }

}
