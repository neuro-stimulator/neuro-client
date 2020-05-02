import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

import { ExperimentResult, ExperimentType } from '@stechy1/diplomka-share';

import { ConfirmDialogComponent, ModalComponent } from 'stim-lib-modal';

import { ExperimentResultsService } from './experiment-results.service';
import { IntroService } from '../share/intro.service';

@Component({
  selector: 'stim-experiment-results',
  templateUrl: './experiment-results.component.html',
  styleUrls: ['./experiment-results.component.sass']
})
export class ExperimentResultsComponent implements OnInit {

  private static readonly INTRO_EXPERIMENT_RESULT: ExperimentResult = {
    id: -1,
    experimentID: -1,
    name: 'Test',
    type: ExperimentType.NONE,
    date: new Date().getTime(),
    outputCount: 1,
    filename: ''
  };

  @ViewChild('modal', {static: true}) modal: ModalComponent;

  ghosts: any[] = [];
  experimentResults: Observable<ExperimentResult[]>;

  constructor(private readonly _service: ExperimentResultsService,
              private readonly _router: Router,
              private readonly _route: ActivatedRoute,
              private readonly _intro: IntroService,
              private readonly logger: NGXLogger) {}

  ngOnInit() {
    this.ghosts = this._service.makeGhosts();
    this.experimentResults = this._service.records;
    this._service.all()
        .then((count: number) => {
          this.ghosts = [];
          this._showIntro(count === 0);
        });
  }

  private _showIntro(useIntroRecord: boolean) {
    this._intro.showIntro('experiment-results-steps', () => {
      if (useIntroRecord) {
        this._service.setIntroRecord(ExperimentResultsComponent.INTRO_EXPERIMENT_RESULT);
      }
    }, () => {
      if (useIntroRecord) {
        this._service.clearIntroRecord();
      }
    });
  }

  handleView(experimentResult: ExperimentResult) {
    this._router.navigate([experimentResult.id], {relativeTo: this._route.parent});
  }

  handleDelete(experimentResult: ExperimentResult) {
    const self = this;
    this.modal.showComponent = ConfirmDialogComponent;
    this.modal.open({
      message: 'EXPERIMENT_RESULTS.DIALOGS.DELETE.QUESTION',
      confirm: () => {
        self.logger.info(`Budu mazat výsledek experimentu s id: ${experimentResult.id}.`);
        return self._service.delete(experimentResult.id);
      }
    });
  }
}
