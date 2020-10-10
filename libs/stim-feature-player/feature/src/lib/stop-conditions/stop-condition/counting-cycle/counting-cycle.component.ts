import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { StopConditionChildComponent } from '../../stop-condition-child.component';
import {
  CycleCountingExperimentStopConditionParams,
  ExperimentStopConditionParams,
} from '@stechy1/diplomka-share';

@Component({
  selector: 'stim-feature-player-stop-condition-counting-cycle',
  templateUrl: './counting-cycle.component.html',
  styleUrls: ['./counting-cycle.component.sass'],
})
export class CountingCycleComponent extends StopConditionChildComponent {
  private readonly _form: FormGroup = new FormGroup({
    cycleCount: new FormControl(),
  });

  areStopConditionsValid(
    stopConditions: ExperimentStopConditionParams
  ): boolean {
    return stopConditions['cycleCount'] != undefined;
  }

  createEmptyStopConditions(): CycleCountingExperimentStopConditionParams {
    return {
      cycleCount: 0,
    };
  }

  get form(): FormGroup {
    return this._form;
  }

  get cycleCount(): FormControl {
    return this.form.get('cycleCount') as FormControl;
  }
}
