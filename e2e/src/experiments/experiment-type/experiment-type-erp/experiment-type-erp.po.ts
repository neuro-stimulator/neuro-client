import { browser } from 'protractor';

import { ExperimentTypeAbstractPage } from '../experiment-type-abstract.po';

export class ExperimentTypeErpPage extends ExperimentTypeAbstractPage {

  navigateTo(): Promise<any> {
    return browser.get('/experiments/erp/new') as Promise<any>;
  }

}
