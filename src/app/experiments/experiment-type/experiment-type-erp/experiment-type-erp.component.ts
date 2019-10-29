import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Edge, Experiment, ExperimentERP, ExperimentType, Random } from 'diplomka-share';

import { BaseExperimentTypeComponent } from '../base-experiment-type.component';
import { ExperimentsService } from '../../experiments.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-experiment-type-erp',
  templateUrl: './experiment-type-erp.component.html',
  styleUrls: ['./experiment-type-erp.component.sass']
})
export class ExperimentTypeErpComponent extends BaseExperimentTypeComponent<ExperimentERP> implements OnInit {

  outputCountParams: Options = {
    floor: 1,
    ceil: 8,
    showTicks: true,
    showTicksValues: true,
    tickStep: 1,
    animate: false
  };

  constructor(service: ExperimentsService, route: ActivatedRoute) {
    super(service, route);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected _createFormGroup(): FormGroup {
    return new FormGroup({
      outputCount: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(8)]),
      out: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(9999)]),
      wait: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(9999)]),
      random: new FormControl(null, [Validators.required]),
      edge: new FormControl(null, [Validators.required])
    });
  }

  protected _createEmptyExperiment(): ExperimentERP {
    return {
      name: '',
      description: '',
      created: new Date().getTime(),
      type: ExperimentType.ERP,
      output: {},
      outputCount: 1,
      out: 0,
      wait: 0,
      random: Random.OFF,
      edge: Edge.FALLING,
      maxDistributionValue: 0
    };
  }

  get randoms() {
    return [
      {id: Random.OFF , name: 'OFF'},
      {id: Random.SHORT , name: 'SHORT'},
      {id: Random.LONG , name: 'LONG'},
      {id: Random.SHORT_LONG , name: 'SHORT_LONG'},
    ];
  }

  get edges() {
    return [
      {id: Edge.FALLING, name: 'FALLING'},
      {id: Edge.LEADING, name: 'LEADING'}
    ];
  }

  get outputCount() {
    return this.form.get('outputCount');
  }

  get out() {
    return this.form.get('out');
  }

  get wait() {
    return this.form.get('wait');
  }

  get random() {
    return this.form.get('random');
  }

  get edge() {
    return this.form.get('edge');
  }


}
