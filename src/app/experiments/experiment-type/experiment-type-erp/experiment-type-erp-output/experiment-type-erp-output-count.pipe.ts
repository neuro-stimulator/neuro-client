import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'experimentTypeErpOutputCount'
})
export class ExperimentTypeErpOutputCountPipe implements PipeTransform {

  transform(outputs: AbstractControl[], count: number): any {
    return outputs.filter(output => output.get('orderId').value <= count);
  }

}
