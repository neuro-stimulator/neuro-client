import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ShareValidators {
  private constructor() {
    // empty body
  }

  public static exclusiveMin(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as number;

      if (value > min) {
        return null;
      }

      return { exclusiveMin: { exclusiveMin: min } };
    };
  }

  public static exclusiveMax(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as number;

      if (value < max) {
        return null;
      }

      return { exclusiveMax: { exclusiveMax: max } };
    };
  }
}
