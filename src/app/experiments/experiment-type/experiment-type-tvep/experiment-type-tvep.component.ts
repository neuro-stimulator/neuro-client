import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { createEmptyExperiment, Experiment } from 'diplomka-share';

import { ExperimentsService } from '../../experiments.service';
import { BaseExperimentTypeComponent } from '../base-experiment-type.component';

@Component({
  selector: 'app-experiment-type-tvep',
  templateUrl: './experiment-type-tvep.component.html',
  styleUrls: ['./experiment-type-tvep.component.sass']
})
export class ExperimentTypeTvepComponent extends BaseExperimentTypeComponent<Experiment> implements OnInit {

  constructor(service: ExperimentsService, router: Router, route: ActivatedRoute, location: Location) {
    super(service, router, route, location);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected _createEmptyExperiment(): Experiment {
    return createEmptyExperiment();
  }

}
