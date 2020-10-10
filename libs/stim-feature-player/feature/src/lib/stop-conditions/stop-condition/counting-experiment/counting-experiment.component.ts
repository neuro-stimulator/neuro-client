import { Component } from '@angular/core';

import { StopConditionChildComponent } from '../../stop-condition-child.component';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ExperimentStopConditionParams,
  OutputCountingExperimentStopConditionParams,
} from '@stechy1/diplomka-share';

@Component({
  selector: 'stim-feature-player-stop-condition-counting-experiment',
  templateUrl: './counting-experiment.component.html',
  styleUrls: ['./counting-experiment.component.sass'],
})
export class CountingExperimentComponent extends StopConditionChildComponent {
  private readonly _form: FormGroup = new FormGroup({
    maxOutput: new FormControl(),
  });

  areStopConditionsValid(
    stopConditions: ExperimentStopConditionParams
  ): boolean {
    return stopConditions['maxOutput'] != undefined;
  }

  createEmptyStopConditions(): OutputCountingExperimentStopConditionParams {
    return {
      maxOutput: 0,
    };
  }

  get form(): FormGroup {
    return this._form;
  }

  get maxOutput(): FormControl {
    return this.form.get('maxOutput') as FormControl;
  }
}
