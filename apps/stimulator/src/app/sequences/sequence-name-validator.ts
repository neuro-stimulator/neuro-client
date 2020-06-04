import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';

import { SequenceService } from './sequence.service';

@Injectable({ providedIn: 'root' })
export class SequenceNameValidator implements AsyncValidator {

  constructor(private readonly _service: SequenceService) {
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
