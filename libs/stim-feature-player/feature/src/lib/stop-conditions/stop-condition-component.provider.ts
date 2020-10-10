import { Type } from '@angular/core';
import { ExperimentStopConditionType } from '@stechy1/diplomka-share';
import { NoConditionComponent } from './stop-condition/no-condition/no-condition.component';
import { CountingCycleComponent } from './stop-condition/counting-cycle/counting-cycle.component';
import { CountingExperimentComponent } from './stop-condition/counting-experiment/counting-experiment.component';

export class StopConditionComponentProvider {
  public mapStopConditionToComponent(
    stopCondition: ExperimentStopConditionType
  ): Type<object> {
    switch (stopCondition) {
      case ExperimentStopConditionType.COUNTING_CYCLE_STOP_CONDITION:
        return CountingCycleComponent;
      case ExperimentStopConditionType.COUNTING_EXPERIMENT_STOP_CONDITION:
        return CountingExperimentComponent;
      case ExperimentStopConditionType.NO_STOP_CONDITION:
        return NoConditionComponent;
      default:
        return null;
    }
  }
}
