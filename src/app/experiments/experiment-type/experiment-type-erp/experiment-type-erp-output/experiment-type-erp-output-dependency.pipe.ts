import { Pipe, PipeTransform } from '@angular/core';
import { OutputDependency } from 'diplomka-share';

@Pipe({
  name: 'experimentTypeErpOutputDependency'
})
export class ExperimentTypeErpOutputDependencyPipe implements PipeTransform {

  transform(dependency: OutputDependency): any {
    return `${dependency.destOutput}x${dependency.count}`;
  }

}
