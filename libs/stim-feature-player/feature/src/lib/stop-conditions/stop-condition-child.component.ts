import { FormGroup } from '@angular/forms';
import { ExperimentStopConditionParams } from '@stechy1/diplomka-share';

export abstract class StopConditionChildComponent {
  public abstract get form(): FormGroup;

  public abstract areStopConditionsValid(
    stopConditions: ExperimentStopConditionParams
  ): boolean;

  public abstract createEmptyStopConditions(): ExperimentStopConditionParams;
}
