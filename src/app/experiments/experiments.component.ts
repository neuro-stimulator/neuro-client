import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

import { Experiment, ExperimentType } from 'diplomka-share';

import { ModalComponent } from '../share/modal/modal.component';
import { FabListEntry } from '../share/fab/fab-list-entry';
import { ConfirmDialogComponent } from '../share/modal/confirm/confirm-dialog.component';

import { ExperimentsService } from './experiments.service';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.sass']
})
export class ExperimentsComponent implements OnInit {

  @ViewChild('modal', {static: true}) modal: ModalComponent;

  ghosts: any[] = [];
  experiments: Observable<Experiment[]>;
  fabButtonList: FabListEntry[] = [
    {id: ExperimentType.REA, text: 'REA', class: 'rea', tooltip: 'REA'},
    {id: ExperimentType.TVEP, text: 'TVEP', class: 'tvep', tooltip: 'TVEP'},
    {id: ExperimentType.FVEP, text: 'FVEP', class: 'fvep', tooltip: 'FVEP'},
    {id: ExperimentType.CVEP, text: 'CVEP', class: 'cvep', tooltip: 'CVEP'},
    {id: ExperimentType.ERP, text: 'ERP', class: 'erp', tooltip: 'ERP'},
  ];

  constructor(private readonly _service: ExperimentsService,
              private readonly _router: Router,
              private readonly _route: ActivatedRoute,
              private readonly logger: NGXLogger) {}

  ngOnInit() {
    this.ghosts = this._service.makeGhosts();
    this.experiments = this._service.records;
    this._service.all()
        .then(() => {
          this.ghosts = [];
        });
  }

  handleEdit(experiment: Experiment) {
    const type = ExperimentType[experiment.type].toLowerCase();
    this._router.navigate([type, experiment.id], {relativeTo: this._route});
  }

  handleRun(experiment: Experiment) {
    const type = ExperimentType[experiment.type].toLowerCase();
    this._router.navigate(['/', 'player', type, experiment.id], {relativeTo: null});
  }

  handleSimulate(experiment: Experiment) {
    const type = ExperimentType[experiment.type].toLowerCase();
    this._router.navigate(['/', 'simulation', type, experiment.id], {relativeTo: null});
  }

  handleDelete(experiment: Experiment) {
    const self = this;
    this.modal.showComponent = ConfirmDialogComponent;
    this.modal.open({
      message: 'Opravdu si přejete smazat vybraný experiment?',
      confirm: () => {
        self.logger.info(`Budu mazat experiment s id: ${experiment.id}.`);
        return self._service.delete(experiment.id);
      }
    });
  }

  handleNewExperiment(experimentType: ExperimentType) {
    const type: string = ExperimentType[experimentType].toLowerCase();
    this.logger.info(`Budu vytvářet nový experiment typu: ${type}.`);
    this._router.navigate([type, 'new'], {relativeTo: this._route});
  }
}
