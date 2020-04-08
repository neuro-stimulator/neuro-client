import { browser, by, element, ElementFinder, protractor } from 'protractor';

import { ExperimentType } from '@stechy1/diplomka-share';

import { ApplicationPage } from '../../app.po';
import { ExperimentsPage } from '../experiments.po';
import { ExperimentTypeAbstractPage } from './experiment-type-abstract.po';

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
  public async testExperimentLivecycle(type: ExperimentType, name: string) {
    // Přejdi na hlavní stránku
    await this.experiments.navigateTo();
    // Ujistím se, že není vytvořený žádný předchozí experiment
    await browser.wait(protractor.ExpectedConditions.visibilityOf(this.experiments.experimentsEmptyHeader), 5000);
    // Přejdu na stránku editoru nového experimentu
    await this.goToNewExperimentPage(type);
    // Vyplním název experimentu
    await this.page.fillExperimentName(name);
    // Počkám na validaci názvu
    await browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.page.experimentSaveButton), 5000);
    // Ověřím, že vyplněný název je unikátní -> nezobrazí se hláška, že jméno již existuje
    expect(this.page.validationHeaderNameExists.isPresent()).toBe(false, 'Vyplněné jméno existuje!');
    // Tlačtko pro uložení by nyní již mělo být aktivní
    expect(this.page.experimentSaveButton.getAttribute('disabled')).toBe(null);
    // Proto na něj i kliknu
    await this.page.experimentSaveButton.click();
    // TODO Ověřit, že se zobrazí notifikace
    await this.checkExperimentCreated(name);
    // Ověřím, že existují tlačítka v toolbaru řádku experimentu
    await this.checkExperimentRowToolbar(name);
    // Nakonec experiment vymažu
    await this.experiments.deleteAllExperiments();
    // Nakonec ještě chviličku počkám, než se vše uklidní
    await browser.sleep(1000);
  }

  /**
   * Ověří přítomnost všech zadaných vstupů podle ID i podle class
   */
  public async testExperimentInputPresents() {
    const pageInputs = this.page.getPageInputs();
    const mergedInputs = [...pageInputs.ids ?? [], ...this.page.commonExperimentInputs];
    for (const input of mergedInputs) {
      const inputElement = await element(by.id(input));
      await browser.wait(protractor.ExpectedConditions.visibilityOf(inputElement), 5000);
      expect(inputElement.isPresent()).toBe(true, `Element: ${input} nebyl nalezen!`);
    }

    for (const input of pageInputs.classes ?? []) {
      const inputElements: ElementFinder[] = await element.all(by.className(input.name));
      expect(inputElements.length).toBe(input.count, `Na stránce se nevyskytuje požadovaný počet elementů třídy: ${input.name}!`);
    }
  }

  public async testInvalidName(type: ExperimentType) {
    const experimentName = 'invalidName';
    // Přejdi na stránku s experimenty
    await this.experiments.navigateTo();
    // Odtud přejdi do editoru experimentu
    await this.goToNewExperimentPage(type);
    // Vyplním název experimentu
    await this.page.fillExperimentName(experimentName);
    // Počkám na validaci názvu
    await browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.page.experimentSaveButton),  5000);
    // Ověřím, že vyplněný název je unikátní -> nezobrazí se hláška, že jméno již existuje
    expect(this.page.validationHeaderNameExists.isPresent()).toBe(false, 'Vyplněné jméno existuje!');
    // Tlačtko pro uložení by nyní již mělo být aktivní
    expect(this.page.experimentSaveButton.getAttribute('disabled')).toBe(null);
    // Proto na něj i kliknu
    await this.page.experimentSaveButton.click();
    // Zkontroluj, že byl vytvořený
    await this.checkExperimentCreated(experimentName);

    // Znovu přejdi do editoru experimentu
    await this.goToNewExperimentPage(type);
    // Opět vyplň stejný název experimentu
    await this.page.fillExperimentName(experimentName);
    // Počkám na validaci názvu
    // await browser.wait(protractor.ExpectedConditions.elementToBeDisabled(this.page.experimentSaveButton), 5000);
    // Počkám si, než se zobrazí hláška, že jméno není unikátní
    await browser.wait(protractor.ExpectedConditions.visibilityOf(this.page.validationHeaderNameExists), 5000);
    // Ověřím, že vyplněný název již není unikátní -> zobrazí se hláška
    expect(this.page.validationHeaderNameExists.isDisplayed()).toBe(true, 'Vyplněné jméno existuje!');
    // Tlačtko pro uložení by nyní již mělo být aktivní
    expect(this.page.experimentSaveButton.getAttribute('disabled')).toBeDefined();

    // Půjdu zpátky na výpis experimentů
    await this.experiments.navigateTo();
    // Počkám na načtení stránky se všemi experimenty
    await browser.wait(protractor.ExpectedConditions.visibilityOf(this.experiments.availableExperimentList), 5000);
    // Smažu pomocný experiment
    await this.experiments.deleteAllExperiments();
  }

  // ---------------------------------------------------------------------------------------------

  /**
   * Přejde do editoru pro nový experiment
   *
   * @param type Typ nového experimentu
   */
  public async goToNewExperimentPage(type: ExperimentType) {
    // Přejdi na stránku pro založení nového experimentu
    await this.experiments.clickToNewExperiment(type);
    // Test, že se opravdu dostanu na stránku s konfigurací nového experimentu
    expect(this.app.applicationHeader.getText()).toBe('Nový experiment');
    // Tlačítko pro uložení není aktivní
    expect(this.page.experimentSaveButton.getAttribute('disabled')).toBeDefined();
  }

  /**
   * Zkontroluje, že expriment s názvem byl vytvořen
   *
   * @param name Název experimentu, který měl být vytvořen
   */
  public async checkExperimentCreated(name: string) {
    // Přesunu se na stránku se všemi experimenty, kde zkontroluji, že se vytvořil nový experiment
    await this.experiments.navigateTo();
    // Počkám na načtení stránky se všemi experimenty
    await browser.wait(protractor.ExpectedConditions.visibilityOf(this.experiments.availableExperimentList), 5000);
    // Získám řádek s experimentem
    const experimentRow = this.page.getExperimentRowByName(name);
    // // Ověřím, že experiment s požadovaným názvem byl vytvořen
    // expect(experimentRow.element(by.partialLinkText(name)).isDisplayed()).toBe(true);
    // Dále zkontroluji, že se opravdu vytvořil správný experiment (podle jména)
    expect(experimentRow.element(by.className('experiment-name')).element(by.xpath('//strong')).getText()).toBe(name);
  }

  /**
   * Zkontroluje přítomnost všech tlačítek v toolbaru pro zadaný experiment
   *
   * @param name Název experimentu, pro který se má kontrolovat toolbar
   */
  public async checkExperimentRowToolbar(name: string) {
    // Získám řádek s experimentem
    const experimentRow = this.page.getExperimentRowByName(name);
    // Kontrola, že je k dispotici tlačítko pro spuštění experimentu
    await expect(experimentRow.element(by.css('.fa-trash.run')).isPresent).toBeTruthy();
    // Kontrola, že je k dispotici tlačítko pro editaci experimentu
    await expect(experimentRow.element(by.css('.fa-trash.edit')).isPresent).toBeTruthy();
    // A ješte poslední kontrola, že existuje tlačítko pro smazání experimentu
    await expect(experimentRow.element(by.css('.fa-trash.delete')).isPresent).toBeTruthy();
  }
}
