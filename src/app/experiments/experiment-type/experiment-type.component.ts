import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ExperimentType, experimentTypeFromRaw } from 'diplomka-share';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ExperimentsService } from '../experiments.service';

@Component({
  selector: 'app-experiment-type',
  templateUrl: './experiment-type.component.html',
  styleUrls: ['./experiment-type.component.sass']
})
export class ExperimentTypeComponent implements OnInit, OnDestroy {

  public experimentType: BehaviorSubject<ExperimentType> = new BehaviorSubject<ExperimentType>(ExperimentType.NONE);

  private _paramsSubscription: Subscription;

  constructor(public service: ExperimentsService,
              private readonly route: ActivatedRoute) { }

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
