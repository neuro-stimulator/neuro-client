import { browser, by, element, ElementFinder } from 'protractor';

import { Page } from '../../page';
import { ValidatedFormFields } from '../../share';

export class SequencePage implements Page {

  navigateTo(): Promise<any> {
    return browser.get('/sequences/new') as Promise<any>;
  }

  get sequenceEmptyHeader(): ElementFinder {
    return element(by.id('sequence-data-not-found'));
  }

  get fieldSequenceName(): ElementFinder {
    return element(by.id('sequence-name'));
  }

  get fieldSequenceSourceExperiment(): ElementFinder {
    return element(by.id('sequence-source-experiment'));
  }

  findSequenceSourceExperiment(experimentName: string): ElementFinder {
    return this.fieldSequenceSourceExperiment.element(by.cssContainingText('option', experimentName));
  }

  get fieldSequenceSize(): ElementFinder {
    return element(by.id('sequence-size'));
  }

  get fieldTagInput(): ElementFinder {
    return element(by.id('tag-input'));
  }

  get sequenceSaveButton(): ElementFinder {
    return element(by.className('fab-toggler'));
  }

  get buttonGenerateSequence(): ElementFinder {
    return element(by.id('generate-sequence'));
  }

  get buttonShowOriginalSequence(): ElementFinder {
    return element(by.id('show-original-sequence'));
  }

  get buttonGoToExperimentLink(): ElementFinder {
    return element(by.id('go-to-experiment-link'));
  }

  getPageInputs(): ValidatedFormFields {
    return {
      ids: [
        'sequence-name',
        'sequence-source-experiment',
        'sequence-size',
        'tag-input',
      ],
      classes: [
      ]
    };
  }

  public async fillExperimentName(name: string) {
    // Vložím text do inputu
    await this.fieldSequenceName.sendKeys(name);
    // Kliknu na jiný element -> tím si vynutím asynchronní validaci názvu
    await this.fieldSequenceSize.click();
  }
}
