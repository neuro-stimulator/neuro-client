import { Component, OnInit } from '@angular/core';
import { ExperimentsService } from './experiments.service';
import { Observable } from 'rxjs';
import { Experiment, ExperimentType } from 'diplomka-share';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.sass']
})
export class ExperimentsComponent implements OnInit {

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
  }



}
