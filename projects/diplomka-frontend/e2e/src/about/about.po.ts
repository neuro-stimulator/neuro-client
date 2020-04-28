import { browser, by, element } from 'protractor';

export class AboutPage {

  navigateTo() {
    return browser.get('/about') as Promise<any>;
  }

  async getHeader(): Promise<string> {
    return element(by.id('header-master-thesis')).getText() as Promise<string>;
  }

  async getAuthorHeader(): Promise<string> {
    return element(by.id('header-author')).getText() as Promise<string>;
  }
}
