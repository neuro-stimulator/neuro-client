import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';

import { ExperimentsService } from './experiments.service';

@Injectable({ providedIn: 'root' })
export class ExperimentNameValidator implements AsyncValidator {

  constructor(private readonly _service: ExperimentsService) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors> | null {
      if (control.parent === undefined) {
        return null;
      }

      const experimentID = control.parent.value.id;

      return this._service.nameExists(control.value, experimentID)
                 .then((nameExists: boolean) => {
                   return nameExists ? {nameExists: true} : null;
                 });
    }

}
