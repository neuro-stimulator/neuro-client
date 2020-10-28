import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'experimentTypeTvepOutputCount',
  pure: false,
})
export class ExperimentTypeTvepOutputCountPipe implements PipeTransform {
  transform(outputs: AbstractControl[], count: number): AbstractControl[] {
    return outputs.filter((output: AbstractControl) => output.get('orderId').value < count);
  }
}
