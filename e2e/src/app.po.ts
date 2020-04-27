import { browser, by, element, ElementFinder, protractor } from 'protractor';

import { Page } from './page';

export class ApplicationPage implements Page {

  private readonly noToastCondition = protractor.ExpectedConditions.and(this._noToastConditionDefinition);

  navigateTo(): Promise<any> {
    return browser.get('/') as Promise<any>;
  }

  get applicationHeader(): ElementFinder {
    return element(by.id('page-header'));
  }

  get pageToolsButton(): ElementFinder {
    return element(by.id('page-tools-button'));
  }

  get toasterContainer(): ElementFinder {
    return element(by.id('toast-container'));
  }

  public async waitForNoToastVisible() {
    await browser.wait(this.noToastCondition);
  }

  public async waitForPageChange(pageTitle: string) {
    await browser.wait(protractor.ExpectedConditions.textToBePresentInElement(this.applicationHeader, pageTitle), 5000,
      `Titulek: ${pageTitle} nebyl nalezen!`);
    await this.waitForNoToastVisible();
  }

  private async _noToastConditionDefinition() {
    return await element(by.id('toast-container')).all(by.className('ngx-toastr')).count() === 0;
  }

}
