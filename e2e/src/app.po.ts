import { browser, by, element, ElementFinder } from 'protractor';

import { Page } from './page';

export class ApplicationPage implements Page {

  navigateTo(): Promise<any> {
    return browser.get('/') as Promise<any>;
  }

  get applicationHeader(): ElementFinder {
    return element(by.id('page-header'));
  }

}
