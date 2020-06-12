import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";

import { SequencesFacade } from "@diplomka-frontend/stim-feature-sequences/domain";


@Injectable({ providedIn: "root" })
export class SequenceNameValidator implements AsyncValidator {

  constructor(private readonly _service: SequencesFacade) {
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
