import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(service: ExperimentsService,
              toastr: ToastrService,
              router: Router,
              route: ActivatedRoute,
              location: Location,
              cdr: ChangeDetectorRef) {
    super(service, toastr, router, route, location, cdr);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected _createOutputsFormControls(): FormGroup[] {
    const array = [];
    for (let i = 0; i < 8; i++) {
      const group = new FormGroup({
        id: new FormControl(null, Validators.required),
        experimentId: new FormControl(null, Validators.required),
        orderId: new FormControl(null, Validators.required),
        pulseUp: new FormControl(null, [Validators.required]),
        pulseDown: new FormControl(null, [Validators.required]),
        distribution: new FormControl(null, [Validators.required]),
        brightness: new FormControl(null, [
          Validators.required, Validators.min(0), Validators.max(100)
        ]),
        dependencies: new FormArray([
          new FormControl([]),
          new FormControl(null, [Validators.pattern('^[0-8]x[1-9]+[0-9]*')]),
        ])
      });
      array.push(group);
    }

    return array;
  }

  protected _createFormControls(): {[p: string]: AbstractControl} {
    const superControls = super._createFormControls();
    const myControls = {
      outputCount: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(8)]),
      maxDistributionValue: new FormControl(0, [Validators.required]),
      out: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(9999)]),
      wait: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(9999)]),
      random: new FormControl(null, [Validators.required]),
      edge: new FormControl(null, [Validators.required]),
      outputs: new FormArray([]),
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
      maxDistributionValue: 0,
      outputs: []
    };
  }


  protected _updateFormGroup(experiment: ExperimentERP) {
    if (experiment.outputs.length > 0) {
      (this.form.get('outputs') as FormArray).controls = this._createOutputsFormControls();
    } else {
      (this.form.get('outputs') as FormArray).controls = [];
    }

    super._updateFormGroup(experiment);
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
