import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';
import { Options as SliderOptions } from 'ng5-slider';

import { Edge, ExperimentERP, ExperimentType, Random } from 'diplomka-share';

import { environment } from '../../../../environments/environment';
import { NavigationService } from '../../../navigation/navigation.service';
import { dependencyValidatorPattern } from '../../experiments.share';
import { ExperimentsService } from '../../experiments.service';
import { BaseExperimentTypeComponent } from '../base-experiment-type.component';
import { ExperimentTypeErpOutputDependencyValidator } from './experiment-type-erp-output-dependency.validator';

@Component({
  selector: 'app-experiment-type-erp',
  templateUrl: './experiment-type-erp.component.html',
  styleUrls: ['./experiment-type-erp.component.sass']
})
export class ExperimentTypeErpComponent extends BaseExperimentTypeComponent<ExperimentERP> implements OnInit {

  outputCountParams: SliderOptions = {
    floor: 1,
    ceil: environment.maxOutputCount,
    showTicks: true,
    showTicksValues: true,
    tickStep: 1,
    animate: false
  };

  constructor(service: ExperimentsService,
              toastr: ToastrService,
              router: Router,
              route: ActivatedRoute,
              navigation: NavigationService,
              cdr: ChangeDetectorRef,
              logger: NGXLogger) {
    super(service, toastr, router, route, navigation, cdr, logger);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected _createOutputsFormControls(): FormGroup[] {
    const array = [];
    for (let i = 0; i < environment.maxOutputCount; i++) {
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
          new FormControl(null, [
            Validators.pattern(dependencyValidatorPattern),
            ExperimentTypeErpOutputDependencyValidator.createValidator()]),
        ])
      });
      group.setParent(this.form);
      array.push(group);
    }

    return array;
  }

  protected _createFormControls(): { [p: string]: AbstractControl } {
    const superControls = super._createFormControls();
    const myControls = {
      outputCount: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(environment.maxOutputCount)]),
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
      {id: Random.OFF, name: 'OFF'},
      {id: Random.SHORT, name: 'SHORT'},
      {id: Random.LONG, name: 'LONG'},
      {id: Random.SHORT_LONG, name: 'SHORT_LONG'},
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
