import { browser } from 'protractor';

import { ExperimentTypeAbstractPage } from '../experiment-type-abstract.po';

export class ExperimentTypeErpPage extends ExperimentTypeAbstractPage {

  navigateTo(): Promise<any> {
    return browser.get('/experiments/erp/new') as Promise<any>;
  }

  getPageInputs(): {ids?: string[], classes?: Array<{name: string, count: number}>} {
    return {
      ids: [
        'erp-random',
        'erp-output-count',
        'erp-wait',
        'erp-out',
        'erp-max-dstribution',
        'erp-edge'
      ],
      classes: [
        { name: 'erp-pulse-up', count: 1 },
        { name: 'erp-pulse-down', count: 1 },
        { name: 'erp-distribution', count: 1 },
        { name: 'erp-brightness', count: 1 },
        { name: 'erp-dependencies', count: 1 },
      ]
    };
  }
}
