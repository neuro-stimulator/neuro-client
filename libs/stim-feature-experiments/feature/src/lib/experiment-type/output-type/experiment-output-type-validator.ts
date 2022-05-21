import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validátor použitých typů výstupů.
 *
 * Pokud se vybere audio výstup a nebude zvolen soubor, typ nebude validni.
 * Pokud se vybere obrázkový výstup a nebude zvolen soubor, typ nebude validní.
 */
export class ExperimentOutputTypeValidator {

  public static createValidator(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      if (!control.get('led').value && !control.get('matrix').value && !control.get('audio').value && !control.get('image').value) {
        return { noOutputType: true };
      }

      // Pokud je výstup typu LED, není co validovat, takže vrátím null
      if (control.get('led').value === true) {
        return null;
      }

      const errors = {matrixContent: false, audioFile: false, imageFile: false};

      if (control.get('matrix').value === true) {
        if (control.get('matrixContent').value === null) {
          errors.matrixContent = true;
        }
      }

      if (control.get('audio').value === true) {
        if (control.get('audioFile').value === null) {
          errors.audioFile = true;
        }
      }

      if (control.get('image').value === true) {
        if (control.get('imageFile').value === null) {
          errors.imageFile = true;
        }
      }

      if (errors.matrixContent || errors.audioFile || errors.imageFile) {
        return errors;
      }

      return null;
    };
  }

}
