import { ExperimentType } from '@stechy1/diplomka-share';

import { ApplicationPage } from "../../../support/app.po";
import { ExperimentsPage } from "../../../support/experiments/experiments.po";
import { ExperimentTypeAbstractPage } from "../../../support/experiments/experiment-type/experiment-type-abstract.po";
import { validateFormFields } from "../../../support/share";


export class ExperimentTypeAbstractSpecHelper {

  constructor(private readonly app: ApplicationPage,
              private readonly experiments: ExperimentsPage,
              private readonly page: ExperimentTypeAbstractPage) {}

  /**
   * Pomocná funkce pro otestování vytvoření ověření a smazání určitého druhu experimentu
   *
   * @param type Typ experimentu
   * @param name Název experimentu
   */
  public testExperimentLivecycle(type: ExperimentType, name: string) {
    // Přejdi na hlavní stránku
    this.experiments.navigateTo();
    // Ujistím se, že není vytvořený žádný předchozí experiment
    this.experiments.experimentsEmptyHeader.should('be.visible');
    // browser.wait(protractor.ExpectedConditions.visibilityOf(this.experiments.experimentsEmptyHeader), 5000);
    // Přejdu na stránku editoru nového experimentu
    this.goToNewExperimentPage(type);
    // Vyplním název experimentu
    this.page.fillExperimentName(name);
    // Počkám na validaci názvu
    this.page.experimentSaveButton.should('not.be.disabled');
    // browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.page.experimentSaveButton), 5000);
    // Ověřím, že vyplněný název je unikátní -> nezobrazí se hláška, že jméno již existuje
    this.page.validationHeaderNameExistsIsNotVisible();
    // this.page.validationHeaderNameExists?.should('not.be.visible');
    // expect(this.page.validationHeaderNameExists.isPresent()).toBe(false, 'Vyplněné jméno existuje!');
    // Tlačtko pro uložení by nyní již mělo být aktivní
    this.page.experimentSaveButton.should('not.have.attr', 'disabled');
    // expect(this.page.experimentSaveButton.getAttribute('disabled')).toBe(null);
    // Proto na něj i kliknu
    this.page.experimentSaveButton.click();
    // Dám možnost upravit data i po založení hového experimentu
    this.checkExperimentCreated(name);
    // Ověřím, že existují tlačítka v toolbaru řádku experimentu
    this.checkExperimentRowToolbar(name);
    // Nakonec experiment vymažu
    this.experiments.deleteAllExperiments();
  }

  /**
   * Ověří přítomnost všech zadaných vstupů podle ID i podle class
   */
  public testExperimentInputPresents() {
    const pageInputs = this.page.getPageInputs();
    validateFormFields({ ids: [...pageInputs.ids ?? [], ...this.page.commonExperimentInputs], classes: pageInputs.classes ?? [] });
  }

  /**
   * Ověří validátor názvu experimentu
   *
   * @param type Typ experimentu, který se má testovat
   */
  public testInvalidName(type: ExperimentType) {
    const experimentName = 'invalidName';
    // Přejdi na stránku s experimenty
    this.experiments.navigateTo();
    // Odtud přejdi do editoru experimentu
    this.goToNewExperimentPage(type);
    // Vyplním název experimentu
    this.page.fillExperimentName(experimentName);
    // Počkám na validaci názvu
    this.page.experimentSaveButton.should('not.be.disabled');
    // browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.page.experimentSaveButton),  5000);
    // Ověřím, že vyplněný název je unikátní -> nezobrazí se hláška, že jméno již existuje
    this.page.validationHeaderNameExistsIsNotVisible();
    // expect(this.page.validationHeaderNameExists.isPresent()).toBe(false, 'Vyplněné jméno existuje!');
    // Tlačtko pro uložení by nyní již mělo být aktivní
    this.page.experimentSaveButton.should('not.have.attr', 'disabled');
    // expect(this.page.experimentSaveButton.getAttribute('disabled')).toBe(null);
    // Proto na něj i kliknu
    this.page.experimentSaveButton.click();
    // Zkontroluj, že byl vytvořený
    this.checkExperimentCreated(experimentName);

    // Znovu přejdi do editoru experimentu
    this.goToNewExperimentPage(type);
    // Opět vyplň stejný název experimentu
    this.page.fillExperimentName(experimentName);
    // Počkám na validaci názvu
    // this.page.experimentSaveButton.should('not.be.disabled');
    // browser.wait(protractor.ExpectedConditions.elementToBeDisabled(this.page.experimentSaveButton), 5000);
    // Počkám si, než se zobrazí hláška, že jméno není unikátní
    // browser.wait(protractor.ExpectedConditions.visibilityOf(this.page.validationHeaderNameExists), 5000);
    // Ověřím, že vyplněný název již není unikátní -> zobrazí se hláška
    this.page.validationHeaderNameExists.should('be.visible');
    // expect(this.page.validationHeaderNameExists.isDisplayed()).toBe(true, 'Vyplněné jméno existuje!');
    // Tlačtko pro uložení by nyní již mělo být aktivní
    this.page.experimentSaveButton.should('have.attr', 'disabled');
    // expect(this.page.experimentSaveButton.getAttribute('disabled')).toBeDefined();

    // Půjdu zpátky na výpis experimentů
    this.experiments.navigateTo();
    // Počkám na načtení stránky se všemi experimenty

    // browser.wait(protractor.ExpectedConditions.visibilityOf(this.experiments.availableExperimentList), 5000);
    // Smažu pomocný experiment
    this.experiments.deleteAllExperiments();
  }

  // ---------------------------------------------------------------------------------------------

  /**
   * Přejde do editoru pro nový experiment
   *
   * @param type Typ nového experimentu
   */
  public goToNewExperimentPage(type: ExperimentType) {
    // Přejdi na stránku pro založení nového experimentu
    this.experiments.clickToNewExperiment(type);
    // Test, že se opravdu dostanu na stránku s konfigurací nového experimentu
    this.app.applicationHeader.should('have.text', 'Nový experiment');
    // expect(this.app.applicationHeader.getText()).toBe('Nový experiment');
    // Tlačítko pro uložení není aktivní
    this.page.experimentSaveButton.should('have.attr', 'disabled');
    // expect(this.page.experimentSaveButton.getAttribute('disabled')).toBeDefined();
  }

  /**
   * Zkontroluje, že expriment s názvem byl vytvořen
   *
   * @param name Název experimentu, který měl být vytvořen
   */
  public checkExperimentCreated(name: string) {
    // Přesunu se na stránku se všemi experimenty, kde zkontroluji, že se vytvořil nový experiment
    this.experiments.navigateTo();
    // Počkám na načtení stránky se všemi experimenty
    // browser.wait(protractor.ExpectedConditions.visibilityOf(this.experiments.availableExperimentList), 5000);
    // Získám řádek s experimentem
    const experimentRow = this.experiments.findExperimentRowByName(name);
    // // Ověřím, že experiment s požadovaným názvem byl vytvořen
    // expect(experimentRow.element(by.partialLinkText(name)).isDisplayed()).toBe(true);
    // Dále zkontroluji, že se opravdu vytvořil správný experiment (podle jména)
    experimentRow.get('.experiment-name').contains(name).should('be.visible');
    // expect(experimentRow.element(by.className('experiment-name')).element(by.xpath('//strong')).getText()).toBe(name);
  }

  /**
   * Zkontroluje přítomnost všech tlačítek v toolbaru pro zadaný experiment
   *
   * @param name Název experimentu, pro který se má kontrolovat toolbar
   */
  public checkExperimentRowToolbar(name: string) {
    // Získám řádek s experimentem
    const experimentRow = this.experiments.findExperimentRowByName(name);
    // Kontrola, že je k dispotici tlačítko pro spuštění experimentu
    experimentRow.get('.fa-play.run').should('be.visible');
    // expect(experimentRow.element(by.css('.fa-trash.run')).isPresent).toBeTruthy();
    // Kontrola, že je k dispotici tlačítko pro editaci experimentu
    experimentRow.get('.fa-edit.edit').should('be.visible');
    // expect(experimentRow.element(by.css('.fa-trash.edit')).isPresent).toBeTruthy();
    // A ješte poslední kontrola, že existuje tlačítko pro smazání experimentu
    experimentRow.get('.fa-trash.delete').should('be.visible');
    // expect(experimentRow.element(by.css('.fa-trash.delete')).isPresent).toBeTruthy();
  }

  /**
   * Vytvoří nový validní experiment na základě jména a typu experimentu
   *
   * @param name Název experimentu
   * @param type Typ experimentu
   */
  public createNewExperiment(name: string, type: ExperimentType) {
    // Půjdu na stránku všech experimentů
    this.experiments.navigateTo();
    // Počkám, až zmizí všechny toastery
    this.app.waitForNoToastVisible();
    // Přejdu do editoru experimentu
    this.goToNewExperimentPage(type);
    // Vyplním název experimentu
    this.page.fillExperimentName(name);
    // Dám možnost upravit hodnoty experimentu
    this.page.changeFieldValues();
    // Počkám na validaci názvu
    // browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.page.experimentSaveButton), 5000);
    // Tlačtko pro uložení by nyní již mělo být aktivní
    this.page.experimentSaveButton.should('not.have.attr', 'disabled');
    // expect(this.page.experimentSaveButton.getAttribute('disabled')).toBe(null);
    // Proto na něj i kliknu
    this.page.experimentSaveButton.click();
    // Počkám, až zmizí všechny toastery
    this.app.waitForNoToastVisible();
    // Dám možnost upravit data i po založení hového experimentu
    this.page.afterExperimentCreated();
    // Pro jistotu ověřím, že experiment byl vytvořen
    this.checkExperimentCreated(name);
  }
}
