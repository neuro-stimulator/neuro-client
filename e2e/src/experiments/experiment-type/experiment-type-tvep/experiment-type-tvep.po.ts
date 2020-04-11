import { browser } from 'protractor';

import { ExperimentTypeAbstractPage } from '../experiment-type-abstract.po';

export class ExperimentTypeTvepPage extends ExperimentTypeAbstractPage {

  navigateTo(): Promise<any> {
    return browser.get('/experiments/tvep/new') as Promise<any>;
  }

  getPageInputs(): {ids?: string[], classes?: Array<{name: string, count: number}>} {
    return {
      ids: [
        'tvep-output-count'
      ],
      classes: [
        { name: 'tvep-pattern-length', count: 1 },
        { name: 'tvep-out', count: 1 },
        { name: 'tvep-wait', count: 1 },
        { name: 'tvep-brightness', count: 1 },
        { name: 'output-pattern', count: 1 },
      ]
    };
  }
}
