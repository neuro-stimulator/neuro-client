import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { StopConditionChildComponent } from '../../stop-condition-child.component';
import { ExperimentStopConditionParams } from '@stechy1/diplomka-share';

@Component({
  selector: 'stim-feature-player-stop-condition-no-condition',
  templateUrl: './no-condition.component.html',
  styleUrls: ['./no-condition.component.sass'],
})
export class NoConditionComponent extends StopConditionChildComponent {
  private readonly _form: FormGroup = new FormGroup({});

  areStopConditionsValid(
    stopConditions: ExperimentStopConditionParams
  ): boolean {
    return Object.keys(stopConditions).length === 0;
  }

  createEmptyStopConditions(): ExperimentStopConditionParams {
    return {};
  }

  get form(): FormGroup {
    return this._form;
  }
}
