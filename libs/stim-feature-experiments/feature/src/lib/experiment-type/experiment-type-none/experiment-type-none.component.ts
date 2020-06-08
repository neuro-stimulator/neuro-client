import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';

import { createEmptyExperiment, Experiment } from '@stechy1/diplomka-share';

import { ExperimentsFacade } from "@diplomka-frontend/stim-feature-experiments/domain";
import { NavigationFacade } from "@diplomka-frontend/stim-feature-navigation/domain";

import { ExperimentNameValidator } from '../../experiment-name-validator';
import { BaseExperimentTypeComponent } from '../base-experiment-type.component';

@Component({
  templateUrl: './experiment-type-none.component.html',
  styleUrls: ['./experiment-type-none.component.sass']
})
export class ExperimentTypeNoneComponent extends BaseExperimentTypeComponent<Experiment> implements OnInit {

  constructor(service: ExperimentsFacade,
              toastr: ToastrService,
              protected readonly router: Router,
              route: ActivatedRoute,
              navigation: NavigationFacade,
              nameValidator: ExperimentNameValidator,
              logger: NGXLogger) {
    super(service, toastr, router, route, navigation, nameValidator, logger);
  }

  ngOnInit() {
    this.router.navigate(['/experiments']);
  }

  protected _createEmptyExperiment(): Experiment {
    return createEmptyExperiment();
  }
}
