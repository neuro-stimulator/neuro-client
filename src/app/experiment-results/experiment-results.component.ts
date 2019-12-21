import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ExperimentResult } from 'diplomka-share';

import { ExperimentResultsService } from './experiment-results.service';

@Component({
  selector: 'app-experiment-results',
  templateUrl: './experiment-results.component.html',
  styleUrls: ['./experiment-results.component.sass']
})
export class ExperimentResultsComponent implements OnInit {

  ghosts: any[] = [];
  experimentResults: Observable<ExperimentResult[]>;

  constructor(private readonly _service: ExperimentResultsService,
              private readonly _router: Router,
              private readonly _route: ActivatedRoute) {
  }

  ngOnInit() {
    this.ghosts = this._service.makeGhosts();
    this.experimentResults = this._service.records;
    this._service.all()
        .then(() => {
          this.ghosts = [];
        });
  }

  handleView(experimentResult: ExperimentResult) {

  }

  handleDelete(experimentResult: ExperimentResult) {

  }
}
