import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { outputCountValidatorPattern } from '../../experiments.share';

export class ExperimentTypeErpOutputDependencyValidator {
  static createValidator(maxOutputCount: number): ValidatorFn {
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
      if (!value.match(outputCountValidatorPattern(maxOutputCount))) {
        return { invalidValue: true };
      }
      return +value <= +usedOutputs ? null : { invalidDependency: true };
    };
  }
}
