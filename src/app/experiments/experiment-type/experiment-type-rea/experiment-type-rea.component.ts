import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { createEmptyExperiment, Experiment } from 'diplomka-share';

import { BaseExperimentTypeComponent } from '../base-experiment-type.component';
import { ExperimentsService } from '../../experiments.service';

@Component({
  selector: 'app-experiment-type-rea',
  templateUrl: './experiment-type-rea.component.html',
  styleUrls: ['./experiment-type-rea.component.sass']
})
export class ExperimentTypeReaComponent extends BaseExperimentTypeComponent implements OnInit {


  constructor(service: ExperimentsService, route: ActivatedRoute) {
    super(service, route);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected _createEmptyExperiment(): Experiment {
    return createEmptyExperiment();
  }

}
