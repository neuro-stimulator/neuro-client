import { browser } from 'protractor';

import { ExperimentTypeAbstractPage } from '../experiment-type-abstract.po';

export class ExperimentTypeTvepPage extends ExperimentTypeAbstractPage {

  navigateTo(): Promise<any> {
    return browser.get('/experiments/tvep/new') as Promise<any>;
  }

}
