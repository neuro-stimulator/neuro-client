import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

import { Page } from '../../page';

export abstract class ExperimentTypeAbstractPage implements Page {

  public abstract navigateTo(): Promise<any>;

  public abstract getPageInputs(): {ids?: string[], classes?: {name: string, count: number}[]};

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

  get validationHeaderNameExists(): ElementFinder {
    return element(by.id('validation-header-name-exists'));
  }

  get commonExperimentInputs(): string[] {
    return [
      'experiment-description',
      'experiment-name',
      'tag-input',
    ];
  }

  public async fillExperimentName(name: string) {
    // Vložím text do inputu
    await this.fieldExperimentName.sendKeys(name);
    // Kliknu na jiný element -> tím si vynutím asynchronní validaci názvu
    await this.fieldExperimentDescription.click();
  }

  public async fillExperimentDescription(description: string) {
    await this.fieldExperimentDescription.sendKeys(description);
  }

  public async changeFieldValues() {
    return Promise.resolve();
  }

  public async afterExperimentCreated() {
    return Promise.resolve();
  }

}
