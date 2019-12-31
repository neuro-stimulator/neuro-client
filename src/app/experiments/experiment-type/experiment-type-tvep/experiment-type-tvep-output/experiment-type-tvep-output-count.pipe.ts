import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'experimentTypeTvepOutputCount',
  pure: false
})
export class ExperimentTypeTvepOutputCountPipe implements PipeTransform {

  transform(outputs: AbstractControl[], count: number): any {
    return outputs.filter(output => output.get('orderId').value < count);
  }

}
