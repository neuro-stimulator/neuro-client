import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

import { Options as SliderOptions } from 'ng5-slider';
import { ToastrService } from 'ngx-toastr';
import { Edge, ExperimentERP, ExperimentType, Random } from 'diplomka-share';

import { ExperimentsService } from '../../experiments.service';
import { BaseExperimentTypeComponent } from '../base-experiment-type.component';

@Component({
  selector: 'app-experiment-type-erp',
  templateUrl: './experiment-type-erp.component.html',
  styleUrls: ['./experiment-type-erp.component.sass']
})
export class ExperimentTypeErpComponent extends BaseExperimentTypeComponent<ExperimentERP> implements OnInit {

  outputCountParams: SliderOptions = {
    floor: 1,
    ceil: 8,
    showTicks: true,
    showTicksValues: true,
    tickStep: 1,
    animate: false
  };

  constructor(service: ExperimentsService, toastr: ToastrService, router: Router, route: ActivatedRoute, location: Location) {
    super(service, toastr, router, route, location);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected _createFormControls(): {[p: string]: AbstractControl} {
    const superControls = super._createFormControls();
    const myControls = {
      outputCount: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(8)]),
      maxDistributionValue: new FormControl(0, [Validators.required]),
      out: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(9999)]),
      wait: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(9999)]),
      random: new FormControl(null, [Validators.required]),
      edge: new FormControl(null, [Validators.required])
    };

    return {...superControls, ...myControls};
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
