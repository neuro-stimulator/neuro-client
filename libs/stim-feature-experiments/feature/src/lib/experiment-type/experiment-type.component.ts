import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { ExperimentType, experimentTypeFromRaw } from '@stechy1/diplomka-share';

import { ExperimentsFacade } from '@diplomka-frontend/stim-feature-experiments/domain';
import { AliveCheckerFacade, ConnectionInformationState } from '@diplomka-frontend/stim-lib-connection';

import { ExperimentTypeResolverDirective } from '../experiment-type-resolver.directive';
import { ComponentCanDeactivate } from '../experiments.deactivate';
import { ExperimentTypeNoneComponent } from './experiment-type-none/experiment-type-none.component';
import { ExperimentTypeErpComponent } from './experiment-type-erp/experiment-type-erp.component';
import { ExperimentTypeCvepComponent } from './experiment-type-cvep/experiment-type-cvep.component';
import { ExperimentTypeFvepComponent } from './experiment-type-fvep/experiment-type-fvep.component';
import { ExperimentTypeTvepComponent } from './experiment-type-tvep/experiment-type-tvep.component';
import { ExperimentTypeReaComponent } from './experiment-type-rea/experiment-type-rea.component';

@Component({
  selector: 'stim-feature-experiments-experiment-type',
  templateUrl: './experiment-type.component.html',
  styleUrls: ['./experiment-type.component.sass'],
})
export class ExperimentTypeComponent implements OnInit, OnDestroy, ComponentCanDeactivate {
  @ViewChild(ExperimentTypeResolverDirective)
  experimentTypeResolver: ExperimentTypeResolverDirective;

  public experimentType: BehaviorSubject<ExperimentType> = new BehaviorSubject<ExperimentType>(ExperimentType.NONE);

  private _paramsSubscription: Subscription;
  componentMap = {};

  constructor(private readonly _facade: ExperimentsFacade, private readonly _connection: AliveCheckerFacade, private readonly route: ActivatedRoute) {
    this.componentMap[ExperimentType.NONE] = ExperimentTypeNoneComponent;
    this.componentMap[ExperimentType.ERP] = ExperimentTypeErpComponent;
    this.componentMap[ExperimentType.CVEP] = ExperimentTypeCvepComponent;
    this.componentMap[ExperimentType.FVEP] = ExperimentTypeFvepComponent;
    this.componentMap[ExperimentType.TVEP] = ExperimentTypeTvepComponent;
    this.componentMap[ExperimentType.REA] = ExperimentTypeReaComponent;
  }

  private _handleRouteParams(params: Params) {
    const experimentType = params['type'];

    this.experimentType.next(experimentTypeFromRaw(experimentType));
  }

  ngOnInit() {
    this._paramsSubscription = this.route.params.subscribe((params: Params) => {
      this._handleRouteParams(params);
    });
  }

  ngOnDestroy(): void {
    this._paramsSubscription.unsubscribe();
  }

  // @HostListener('window:beforeunload')
  canDeactivate(): boolean | Observable<boolean> {
    return true;
    //   return this.experimentTypeResolver.experimentComponent.canDeactivate();
  }

  get connectionState(): Observable<ConnectionInformationState> {
    return this._connection.state;
  }
}
