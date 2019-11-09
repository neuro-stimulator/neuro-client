import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ExperimentTypeErpOutputDependencyValidator {

  static createValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent === undefined) {
        return null;
      }

      const root = control.root as FormGroup;

      const usedOutputs = root.get('outputCount').value as number;
      const valueRaw = control.value as string;
      if (valueRaw === null) {
        return null;
      }

      const value = valueRaw.split('x')[0];
      if (value.length === 0) {
        return null;
      }
      if (!value.match('^[0-8]{1}$')) {
        return {invalidValue: true};
      }
      return (+value <= +usedOutputs) ? null : {invalidDependency: true};
    };
  }

}
