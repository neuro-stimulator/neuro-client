import { browser } from 'protractor';

import { ExperimentTypeAbstractPage } from '../experiment-type-abstract.po';

export class ExperimentTypeFvepPage extends ExperimentTypeAbstractPage {

  navigateTo(): Promise<any> {
    return browser.get('/experiments/fvep/new') as Promise<any>;
  }

}
