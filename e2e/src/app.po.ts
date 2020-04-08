import { browser, by, element, ElementArrayFinder, ElementFinder, protractor } from 'protractor';

import { Page } from './page';
import { falseIfMissing, passBoolean } from 'protractor/built/util';
import { not } from 'rxjs/internal-compatibility';

// protractor.ExpectedConditions.elementToBeDisabled = () => {};

export class ApplicationPage implements Page {

  navigateTo(): Promise<any> {
    return browser.get('/') as Promise<any>;
  }

  get applicationHeader(): ElementFinder {
    return element(by.id('page-header'));
  }

  get pageToolsButton(): ElementFinder {
    return element(by.id('page-tools-button'));
  }

  getErrorArrayByInputId(inputID: string): ElementArrayFinder {
    return element(by.id(inputID)).parentElementArrayFinder.first().all(by.tagName('span'));
  }

}
