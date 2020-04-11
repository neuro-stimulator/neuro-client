import { browser } from 'protractor';

import { ExperimentTypeAbstractPage } from '../experiment-type-abstract.po';

export class ExperimentTypeFvepPage extends ExperimentTypeAbstractPage {

  navigateTo(): Promise<any> {
    return browser.get('/experiments/fvep/new') as Promise<any>;
  }

  getPageInputs(): {ids?: string[], classes?: Array<{name: string, count: number}>} {
    return {
      ids: [
        'fvep-output-count'
      ],
      classes: [
        { name: 'fvep-time-on', count: 1 },
        { name: 'fvep-time-off', count: 1 },
        { name: 'fvep-frequency', count: 1 },
        { name: 'fvep-duty-cycle', count: 1 },
        { name: 'fvep-brightness', count: 1 },
      ]
    };
  }
}
