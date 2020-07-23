import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class RegisterValidators {
  public static mustMatch(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) {
        return null;
      }

      const matchValue = control.value;
      const checkValue = control.parent.get('password').value;

      return matchValue === checkValue ? null : { mustMatch: true };
    };
  }
}
