import { SequencesPage } from '../../support/sequences/sequences.po';
import { SequencePage } from '../../support/sequences/sequence/sequence.po';

export class SequencesHelper {

  constructor(private readonly sequencesPage: SequencesPage,
              private readonly sequencePage: SequencePage) {
  }

  public createSequence(name: string, size: number, experimentName: string) {
    // Přejdu na stránku editoru nové sekvence
    this.sequencePage.navigateTo();
    for (let i = 0; i < 99999999; i++) {
      let x = 1;
      x += 2;
    }
    // Zkontroluji, že je zobrazen nápis s informací, že sekvence nemá vygenerovaná žádná data
    // expect(this.sequencePage.sequenceEmptyHeader.isDisplayed()).toBeTruthy();
    this.sequencePage.sequenceEmptyHeader.should('be.visible');
    // Zkontroluji, že není možné kliknout na tlačítko pro uložení sekvence
    // expect(this.sequencePage.sequenceSaveButton.isEnabled()).toBeFalsy();
    this.sequencePage.sequenceSaveButton.should('be.disabled');
    // Zkontroluji, že není možné kliknout na tlačítko generovat sekvenci
    // expect(this.sequencePage.buttonGenerateSequence.isEnabled()).toBeFalsy();
    this.sequencePage.buttonGenerateSequence.should('be.disabled');
    // Vyplním název sekvence
    this.sequencePage.fillExperimentName(name);
    // Nastavím délku sekvence
    this.sequencePage.fieldSequenceSize.type(`${size}`);
    // Vyberu zdrojový experiment
    this.selectSourceExperiment(experimentName);
    // Nechám vygenerovat sekvenci
    this.sequencePage.buttonGenerateSequence.click();
    // Počkám, až zmizí informace o prázdných datech
    this.sequencePage.sequenceEmptyHeader.should('not.be.visible');
    // browser.wait(protractor.ExpectedConditions.invisibilityOf(this.sequencePage.sequenceEmptyHeader), 5000);
    // Kliknu na tlačítko uložit
    this.sequencePage.sequenceSaveButton.click();
  }

  public selectSourceExperiment(name: string) {
    // Kliknu na combobox pro výběr zdrojového experimentu
    // this.sequencePage.fieldSequenceSourceExperiment.click();
    // Vyberu experiment podle zadaného názvu
    this.sequencePage.fieldSequenceSourceExperiment.select(name);
  }

}
