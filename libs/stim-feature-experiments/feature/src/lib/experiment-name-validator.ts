import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';

import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {
  ExperimentsFacade,
  ExperimentsState,
} from '@diplomka-frontend/stim-feature-experiments/domain';

export class ExperimentNameValidator implements AsyncValidator {
  constructor(private readonly _facade: ExperimentsFacade) {}

  validate(control: AbstractControl): Observable<ValidationErrors> | null {
    if (control.parent === undefined) {
      return null;
    }

    this._facade.nameExists(control.value);

    return this._facade.state
      .pipe(take(2))
      .pipe(
        map((state: ExperimentsState) =>
          state.selectedExperiment.nameExists ? { nameExists: true } : null
        )
      );
  }
}
