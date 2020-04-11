import { browser} from 'protractor';
import { ExperimentTypeAbstractPage } from '../experiment-type-abstract.po';

export class ExperimentTypeReaPage extends ExperimentTypeAbstractPage {

  navigateTo(): Promise<any> {
    return browser.get('/experiments/rea/new') as Promise<any>;
  }

  getPageInputs(): {ids?: string[], classes?: Array<{name: string, count: number}>} {
    return {
      ids: [
        'rea-output-count',
        'rea-cycle-count',
        'rea-wait-time-min',
        'rea-wait-time-max',
        'rea-miss-time',
        'rea-on-fail',
        'rea-brightness'
      ],
      classes: [
        // { name: 'output-pattern', count: 1 }
      ]
    };
  }
}
