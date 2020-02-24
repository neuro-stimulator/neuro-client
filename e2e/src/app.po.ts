import { browser, by, element } from 'protractor';

import { Page } from './page';

export class ApplicationPage implements Page {

  navigateTo(): Promise<any> {
    return browser.get('/') as Promise<any>;
  }

  get applicationHeader(): Promise<string> {
    return element(by.id('page-header')).getText() as Promise<string>;
  }

}
