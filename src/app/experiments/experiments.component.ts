import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { ModalComponent } from '../share/modal/modal.component';

import { ExperimentsService } from './experiments.service';
import { Experiment, ExperimentType } from 'diplomka-share';
import { ConfirmDialogComponent } from '../share/modal/confirm/confirm-dialog.component';
import { FabListButtonEntry } from '../share/fab/fab-list-button-entry';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.sass']
})
export class ExperimentsComponent implements OnInit {

  @ViewChild('modal', {static: true}) modal: ModalComponent;

  ghosts: any[] = [];
  experiments: Observable<Experiment[]>;
  fabButtonList: FabListButtonEntry[] = [
    {id: ExperimentType.REA, text: 'REA', class: 'rea', tooltip: 'REA'},
    {id: ExperimentType.FVEP, text: 'FVEP', class: 'fvep', tooltip: 'FVEP'},
    {id: ExperimentType.TVEP, text: 'TVEP', class: 'tvep', tooltip: 'TVEP'},
    {id: ExperimentType.CVEP, text: 'CVEP', class: 'cvep', tooltip: 'CVEP'},
    {id: ExperimentType.ERP, text: 'ERP', class: 'erp', tooltip: 'ERP'},
  ];

  constructor(private readonly _service: ExperimentsService,
              private readonly _router: Router,
              private readonly _route: ActivatedRoute) { }

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

  handleDelete(experiment: Experiment) {
    const self = this;
    this.modal.showComponent = ConfirmDialogComponent;
    this.modal.open({
      message: 'Opravdu si přejete smazat vybraný experiment?',
      confirm: () => self._service.delete(experiment.id)
    });
  }

  handleNewExperiment(experimentType: ExperimentType) {
    const type = ExperimentType[experimentType].toLowerCase();
    this._router.navigate([type, 'new'], {relativeTo: this._route});
  }
}
