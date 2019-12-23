import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { BehaviorSubject, Subscription } from 'rxjs';

import { ExperimentType, experimentTypeFromRaw } from 'diplomka-share';

import { ExperimentsService } from '../experiments.service';
import { ExperimentTypeNoneComponent } from './experiment-type-none/experiment-type-none.component';
import { ExperimentTypeErpComponent } from './experiment-type-erp/experiment-type-erp.component';
import { ExperimentTypeCvepComponent } from './experiment-type-cvep/experiment-type-cvep.component';
import { ExperimentTypeFvepComponent } from './experiment-type-fvep/experiment-type-fvep.component';
import { ExperimentTypeTvepComponent } from './experiment-type-tvep/experiment-type-tvep.component';
import { ExperimentTypeReaComponent } from './experiment-type-rea/experiment-type-rea.component';

@Component({
  selector: 'app-experiment-type',
  templateUrl: './experiment-type.component.html',
  styleUrls: ['./experiment-type.component.sass']
})
export class ExperimentTypeComponent implements OnInit, OnDestroy {

  public experimentType: BehaviorSubject<ExperimentType> = new BehaviorSubject<ExperimentType>(ExperimentType.NONE);

  private _paramsSubscription: Subscription;
  componentMap = {};

  constructor(public service: ExperimentsService,
              private readonly route: ActivatedRoute) {
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
    this._paramsSubscription = this.route.params.subscribe(params => {
      this._handleRouteParams(params);
    });
  }

  ngOnDestroy(): void {
    this._paramsSubscription.unsubscribe();
  }

}
