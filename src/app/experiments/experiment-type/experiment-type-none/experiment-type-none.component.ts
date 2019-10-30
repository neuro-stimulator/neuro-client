import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { createEmptyExperiment, Experiment } from 'diplomka-share';

import { BaseExperimentTypeComponent } from '../base-experiment-type.component';
import { ExperimentsService } from '../../experiments.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-experiment-type-none',
  templateUrl: './experiment-type-none.component.html',
  styleUrls: ['./experiment-type-none.component.sass']
})
export class ExperimentTypeNoneComponent extends BaseExperimentTypeComponent<Experiment> implements OnInit {

  constructor(service: ExperimentsService, protected readonly router: Router, route: ActivatedRoute, location: Location) {
    super(service, router, route, location);
  }

  ngOnInit() {
    this.router.navigate(['/experiments']);
  }

  protected _createEmptyExperiment(): Experiment {
    return createEmptyExperiment();
  }



}
