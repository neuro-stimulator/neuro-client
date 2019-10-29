import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';

import { ModalComponent } from '../share/modal/modal.component';

import { ExperimentsService } from './experiments.service';
import { Experiment, ExperimentType } from 'diplomka-share';
import { ConfirmDialogComponent } from '../share/modal/confirm/confirm-dialog.component';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.sass']
})
export class ExperimentsComponent implements OnInit {

  @ViewChild('modal', {static: true}) modal: ModalComponent;

  ghosts: any[] = [];
  experiments: Observable<Experiment[]>;

  constructor(private readonly _service: ExperimentsService) { }

  ngOnInit() {
    this.ghosts = this._service.makeGhosts();
    this.experiments = this._service.records;
    this._service.all()
        .then(() => {
          this.ghosts = [];
        });

    // this._service.insert({
    //   name: `${Math.random()}`,
    //   description: 'Test descrition',
    //   type: ExperimentType.ERP,
    //   created: new Date().getTime(),
    //   output: {
    //     led: true
    //   }
    // }).then(() => {});
  }

  handleDelete(experiment: Experiment) {
    const self = this;
    this.modal.showComponent = ConfirmDialogComponent;
    this.modal.open({
      message: 'Opravdu si přejete smazat vybraný experiment?',
      confirm: () => self._service.delete(experiment.id)
    });
  }
}
