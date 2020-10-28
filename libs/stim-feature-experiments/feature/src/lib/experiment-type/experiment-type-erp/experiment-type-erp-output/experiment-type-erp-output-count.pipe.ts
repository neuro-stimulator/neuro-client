import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'experimentTypeErpOutputCount',
  pure: false,
})
export class ExperimentTypeErpOutputCountPipe implements PipeTransform {
  transform(outputs: AbstractControl[], count: number): AbstractControl[] {
    return outputs.filter((output: AbstractControl) => output.get('orderId').value < count);
  }
}
