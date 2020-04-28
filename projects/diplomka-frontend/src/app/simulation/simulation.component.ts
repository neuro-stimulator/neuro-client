import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject, Subscription } from 'rxjs';

import { ExperimentType, experimentTypeFromRaw } from '@stechy1/diplomka-share';

import { ExperimentsService } from '../experiments/experiments.service';
import { SimulationTypeErpComponent } from './simulation-type/simulation-type-erp/simulation-type-erp.component';
import { SimulationTypeComponent } from './simulation-type/simulation-type.component';
import { SerialService } from '../share/serial.service';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.sass']
})
export class SimulationComponent implements OnInit, OnDestroy {

  public experimentType: BehaviorSubject<ExperimentType> = new BehaviorSubject<ExperimentType>(ExperimentType.NONE);

  private _paramsSubscription: Subscription;
  private _simulationTypeComponent: SimulationTypeComponent;
  componentMap = {};
  fragment: string;
  formGroup = new FormGroup({
    sequenceSize: new FormControl(100, Validators.required)
  });
  currentProgress: string;

  constructor(public service: ExperimentsService,
              private readonly _lowLevel: SerialService,
              private readonly route: ActivatedRoute,
              private readonly router: Router) {
    this.componentMap[ExperimentType.ERP] = SimulationTypeErpComponent;
  }

  private _handleRouteParams(params: Params) {
    const experimentType = params['type'];

    this.experimentType.next(experimentTypeFromRaw(experimentType));
  }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
      this.currentProgress = '0%';
    });
    this._paramsSubscription = this.route.params.subscribe(params => {
      this._handleRouteParams(params);
    });
    if (this.route.snapshot.fragment === undefined) {
      this.router.navigate([], {fragment: 'parameters', relativeTo: this.route});
      return;
    }
    this._handleRouteParams(this.route.snapshot.params);
  }

  ngOnDestroy(): void {
    if (this._paramsSubscription !== undefined) {
      this._paramsSubscription.unsubscribe();
    }
  }

  handleGenerateSequence() {
    this._simulationTypeComponent.generateSequence(this.formGroup.get('sequenceSize').value)
        .subscribe(progress => this.onUpdateGenerateStatus(progress));
  }

  onUpdateGenerateStatus(progress: number) {
    this.currentProgress = `${progress}%`;
  }

  handleComponentChange(component: any) {
    this._simulationTypeComponent = component;
  }

  handleInstallExperiment() {
  }

  handleRunExperiment() {
  }

  handleStopExperiment() {
  }
}
