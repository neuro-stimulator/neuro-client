import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ExperimentsService } from '../experiments/experiments.service';
import { ActivatedRoute, Params } from '@angular/router';
import { SimulationTypeErpComponent } from './simulation-type/simulation-type-erp/simulation-type-erp.component';
import { ExperimentType, experimentTypeFromRaw } from 'diplomka-share';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.sass']
})
export class SimulationComponent implements OnInit, OnDestroy {

  public experimentType: BehaviorSubject<ExperimentType> = new BehaviorSubject<ExperimentType>(ExperimentType.NONE);

  private _paramsSubscription: Subscription;
  componentMap = {};

  constructor(public service: ExperimentsService,
              private readonly route: ActivatedRoute) {
    this.componentMap[ExperimentType.ERP] = SimulationTypeErpComponent;
  }

  private _handleRouteParams(params: Params) {
    const experimentType = params['type'];

    this.experimentType.next(experimentTypeFromRaw(experimentType));
  }

  ngOnInit() {
    this._paramsSubscription = this.route.params.subscribe(params => {
      this._handleRouteParams(params);
    });
  }

  ngOnDestroy(): void {
    this._paramsSubscription.unsubscribe();
  }

}
