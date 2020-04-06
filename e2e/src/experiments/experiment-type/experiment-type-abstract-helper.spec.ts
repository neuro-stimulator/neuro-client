import { browser, by } from 'protractor';

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
  public async testCreateNewExperiment(type: ExperimentType, name: string) {
    // Přejdi na hlavní stránku
    await this.experiments.navigateTo();
    // Ujistím se, že není vytvořený žádný předchozí experiment
    expect(this.experiments.experimentsEmptyHeader.getText()).toBeDefined();
    // Přejdi na stránku pro založení nového experimentu
    await this.experiments.clickToNewExperiment(type);
    // Test, že se opravdu dostanu na stránku s konfigurací nového experimentu
    expect(this.app.applicationHeader.getText()).toBe('Nový experiment');
    // Tlačítko pro uložení není aktivní
    expect(this.page.experimentSaveButton.getAttribute('disabled')).toBeDefined();
    // Vyplním název experimentu
    await this.page.fillExperimentName(name);
    // Ověřím, že vyplněný název je unikátní -> nezobrazí se hláška, že jméno již existuje
    expect(this.page.validationHeaderNameExists).toBeNull('Vyplněné jméno existuje!');
    // Tlačtko pro uložení by nyní již mělo být aktivní
    expect(this.page.experimentSaveButton.getAttribute('disabled')).toBe(null);
    // Proto na něj i kliknu
    await this.page.experimentSaveButton.click();
    // Ověřit, že se zobrazí notifikace
    // Přesunu se na stránku se všemi experimenty, kde zkontroluji, že se vytvořil nový experiment
    await this.experiments.navigateTo();
    // Počkám na načtení stránky se všemi experimenty
    await browser.sleep(2000);
    // Zkontroluji, že se opravdu vytvořil nový experiment
    const rows = await this.experiments.awailableExperimentList.all(by.className('experiment-row'));
    expect(rows.length).toEqual(1);
    // Dále zkontroluji, že se opravdu vytvořil správný experiment (podle jména)
    expect(this.experiments.awailableExperimentList.element(by.className('experiment-name')).element(by.xpath('//strong')).getText()).toBe(name);
    // A ješte poslední kontrola, že existuje tlačítko pro smazání experimentu
    expect(this.experiments.awailableExperimentList.element(by.css('.fa-trash.delete')).isPresent).toBeTruthy();
    // Nakonec experiment vymažu
    await this.experiments.deleteAllExperiments();
    // Nakonec ještě chviličku počkám, než se vše uklidní
    await browser.sleep(1000);
  }

}
