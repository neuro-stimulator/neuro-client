import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";

import { ExperimentsFacade } from "@diplomka-frontend/stim-feature-experiments/domain";

export class ExperimentNameValidator implements AsyncValidator {

  constructor(private readonly _service: ExperimentsFacade) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors> | null {
    if (control.parent === undefined) {
      return null;
    }

    const experimentID = control.parent.value.id;

    // TODO name validator
    return new Promise(resolve => null);
    // return this._service.nameExists(control.value, experimentID)
    //            .then((nameExists: boolean) => {
    //              return nameExists ? {nameExists: true} : null;
    //            });
  }

}
