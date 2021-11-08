import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';

import {
  SequencesFacade,
  SequencesState,
} from '@neuro-client/stim-feature-sequences/domain';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SequenceNameValidator implements AsyncValidator {
  constructor(private readonly _facade: SequencesFacade) {}

  validate(control: AbstractControl): Observable<ValidationErrors> | null {
    if (control.parent === undefined) {
      return null;
    }

    this._facade.nameExists(control.value);

    return this._facade.state
      .pipe(take(2))
      .pipe(
        map((state: SequencesState) =>
          state.selectedSequence.nameExists ? { nameExists: true } : null
        )
      );
    // const experimentID = control.parent.value.id;
    //
    // // TODO name validator
    // return new Promise(resolve => null);
    // return this._service.nameExists(control.value, experimentID)
    //            .then((nameExists: boolean) => {
    //              return nameExists ? {nameExists: true} : null;
    //            });
  }
}
