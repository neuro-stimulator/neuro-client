import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

import { ExperimentResult } from '@stechy1/diplomka-share';

import { ExperimentResultsService } from './experiment-results.service';
import { ModalComponent } from '../share/modal/modal.component';
import { ConfirmDialogComponent } from '../share/modal/confirm/confirm-dialog.component';

@Component({
  selector: 'app-experiment-results',
  templateUrl: './experiment-results.component.html',
  styleUrls: ['./experiment-results.component.sass']
})
export class ExperimentResultsComponent implements OnInit {

  @ViewChild('modal', {static: true}) modal: ModalComponent;

  ghosts: any[] = [];
  experimentResults: Observable<ExperimentResult[]>;

  constructor(private readonly _service: ExperimentResultsService,
              private readonly _router: Router,
              private readonly _route: ActivatedRoute,
              private readonly logger: NGXLogger) {}

  ngOnInit() {
    this.ghosts = this._service.makeGhosts();
    this.experimentResults = this._service.records;
    this._service.all()
        .then(() => {
          this.ghosts = [];
        });
  }

  handleView(experimentResult: ExperimentResult) {
    this._router.navigate([experimentResult.id], {relativeTo: this._route});
  }

  handleDelete(experimentResult: ExperimentResult) {
    const self = this;
    this.modal.showComponent = ConfirmDialogComponent;
    this.modal.open({
      message: 'Opravdu si přejete smazat vybraný výsledek experimentu?',
      confirm: () => {
        self.logger.info(`Budu mazat výsledek experimentu s id: ${experimentResult.id}.`);
        return self._service.delete(experimentResult.id);
      }
    });
  }
}
