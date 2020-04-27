import { browser, protractor } from 'protractor';

import { SequencesPage } from './sequences.po';
import { SequencePage } from './sequence/sequence.po';

export class SequencesHelper {

  constructor(private readonly sequencesPage: SequencesPage,
              private readonly sequencePage: SequencePage) {
  }

  public async createSequence(name: string, size: number, experimentName: string) {
    // Přejdu na stránku editoru nové sekvence
    await this.sequencePage.navigateTo();
    for (let i = 0; i < 99999999; i++) {
      let x = 1;
      x += 2;
    }
    // Zkontroluji, že je zobrazen nápis s informací, že sekvence nemá vygenerovaná žádná data
    await expect(await this.sequencePage.sequenceEmptyHeader.isDisplayed()).toBeTruthy();
    // Zkontroluji, že není možné kliknout na tlačítko pro uložení sekvence
    await expect(await this.sequencePage.sequenceSaveButton.isEnabled()).toBeFalsy();
    // Zkontroluji, že není možné kliknout na tlačítko generovat sekvenci
    await expect(await this.sequencePage.buttonGenerateSequence.isEnabled()).toBeFalsy();
    // Vyplním název sekvence
    await this.sequencePage.fillExperimentName(name);
    // Nastavím délku sekvence
    await this.sequencePage.fieldSequenceSize.sendKeys(size);
    // Vyberu zdrojový experiment
    await this.selectSourceExperiment(experimentName);
    // Nechám vygenerovat sekvenci
    await this.sequencePage.buttonGenerateSequence.click();
    // Počkám, až zmizí informace o prázdných datech
    await browser.wait(protractor.ExpectedConditions.invisibilityOf(this.sequencePage.sequenceEmptyHeader), 5000);
    // Kliknu na tlačítko uložit
    await this.sequencePage.sequenceSaveButton.click();
  }

  public async selectSourceExperiment(name: string) {
    // Kliknu na combobox pro výběr zdrojového experimentu
    await this.sequencePage.fieldSequenceSourceExperiment.click();
    // Vyberu experiment podle zadaného názvu
    await this.sequencePage.findSequenceSourceExperiment(name).click();
  }

}
