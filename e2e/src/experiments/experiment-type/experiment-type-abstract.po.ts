import { by, element, ElementArrayFinder, ElementFinder } from 'protractor';

import { Page } from '../../page';

export abstract class ExperimentTypeAbstractPage implements Page {

  public abstract navigateTo(): Promise<any>;

  get experimentSaveButton(): ElementFinder {
    return element(by.className('fab-toggler'));
  }

  get fieldExperimentName(): ElementFinder {
    return element(by.id('experiment-name'));
  }

  get fieldExperimentDescription(): ElementFinder {
    return element(by.id('experiment-description'));
  }

  get fieldExperimentTagInput(): ElementFinder {
    return element(by.id('tag-input'));
  }

  get fieldsExperimentTagBadges(): ElementArrayFinder {
    return element(by.className('tags')).all(by.className('tag-badge'));
  }

  public async fillExperimentName(name: string) {
    await this.fieldExperimentName.sendKeys(name);
  }

  public async fillExperimentDescription(description: string) {
    await this.fieldExperimentDescription.sendKeys(description);
  }
}
