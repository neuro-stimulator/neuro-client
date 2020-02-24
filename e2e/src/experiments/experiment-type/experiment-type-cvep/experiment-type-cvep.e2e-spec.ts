import { browser, by } from 'protractor';

import { ExperimentType } from '@stechy1/diplomka-share';

import { ApplicationPage } from '../../../app.po';
import { ExperimentsPage } from '../../experiments.po';
import { ExperimentTypeCvepPage } from './experiment-type-cvep.po';

describe('Experiment CVEP', () => {

  let app: ApplicationPage;
  let experiments: ExperimentsPage;
  let page: ExperimentTypeCvepPage;

  beforeEach(async () => {
    page = new ExperimentTypeCvepPage();
    experiments = new ExperimentsPage();
    app = new ApplicationPage();
    await browser.waitForAngularEnabled(false);
  });

  it('Should be able to create new experiment, check the list and delete the created experiment.', async () => {
    // Přejdi na hlavní stránku
    await experiments.navigateTo();
    // Ujistím se, že není vytvořený žádný předchozí experiment
    expect(experiments.experimentsEmptyHeader.getText()).toBeDefined();
    // Přejdi na stránku pro založení nového experimentu
    await experiments.clickToNewExperiment(ExperimentType.CVEP);
    // Test, že se opravdu dostanu na stránku s konfigurací nového experimentu
    expect(app.applicationHeader).toBe('Nový experiment');
    // Tlačítko pro uložení není aktivní
    expect(page.experimentSaveButton.getAttribute('disabled')).toBeDefined();
    // Vyplním název experimentu
    await page.experimentNameField.sendKeys('test');
    // Tlačtko pro uložení by nyní již mělo být aktivní
    expect(page.experimentSaveButton.getAttribute('disabled')).toBe(null);
    // Proto na něj i kliknu
    await page.experimentSaveButton.click();
    // Ověřit, že se zobrazí notifikace
    // Přesunu se na stránku se všemi experimenty, kde zkontroluji, že se vytvořil nový experiment
    await experiments.navigateTo();
    // Počkám na načtení stránky se všemi experimenty
    await browser.sleep(1000);
    // Zkontroluji, že se opravdu vytvořil nový experiment
    const rows = await experiments.awailableExperimentList.all(by.className('experiment-row'));
    expect(rows.length).toEqual(1);
    // Dále zkontroluji, že se opravdu vytvořil správný experiment (podle jména)
    expect(experiments.awailableExperimentList.element(by.className('experiment-name')).element(by.xpath('//strong')).getText()).toBe('test');
    // A ješte poslední kontrola, že existuje tlačítko pro smazání experimentu
    expect(experiments.awailableExperimentList.element(by.css('.fa-trash.delete')).isPresent).toBeTruthy();
    // Nakonec experiment vymažu
    await experiments.deleteAllExperiments();
  });

});
