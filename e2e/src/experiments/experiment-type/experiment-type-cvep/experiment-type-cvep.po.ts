import { by, element, ElementFinder } from 'protractor';

export class ExperimentTypeCvepPage {

  get experimentSaveButton(): ElementFinder {
    return element(by.className('fab-toggler'));
  }

  get experimentNameField(): ElementFinder {
    return element(by.id('experiment-name'));
  }

}
