import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';

import { createEmptyExperiment, Experiment, Output } from '@stechy1/diplomka-share';

import { ExperimentsFacade } from '@neuro-client/stim-feature-experiments/domain';
import { NavigationFacade } from '@neuro-client/stim-feature-navigation/domain';

import { ExperimentNameValidator } from '../../experiment-name-validator';
import { BaseExperimentTypeComponent } from '../base-experiment-type.component';
import { AliveCheckerFacade } from '@neuro-client/stim-lib-connection';
import { TOKEN_MAX_OUTPUT_COUNT } from '@neuro-client/stim-lib-common';

@Component({
  templateUrl: './experiment-type-none.component.html',
  styleUrls: ['./experiment-type-none.component.sass'],
})
export class ExperimentTypeNoneComponent extends BaseExperimentTypeComponent<Experiment<Output>, Output> implements OnInit {
  constructor(
    @Inject(TOKEN_MAX_OUTPUT_COUNT) maxOutputCount: number,
    service: ExperimentsFacade,
    toastr: ToastrService,
    protected readonly router: Router,
    route: ActivatedRoute,
    navigation: NavigationFacade,
    connection: AliveCheckerFacade,
    logger: NGXLogger
  ) {
    super(maxOutputCount, service, route, navigation, connection, new ExperimentNameValidator(service), logger);
  }

  ngOnInit() {
    this.router.navigate(['/experiments']);
  }

  protected _createEmptyExperiment(): Experiment<Output> {
    return createEmptyExperiment();
  }
}
