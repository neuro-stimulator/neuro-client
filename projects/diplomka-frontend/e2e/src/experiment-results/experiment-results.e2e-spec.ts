import { browser } from 'protractor';

import { ApplicationPage } from '../app.po';
import { ExperimentResultsPage } from './experiment-results.po';

describe('Experiment results page', () => {

  let app: ApplicationPage;
  let page: ExperimentResultsPage;

  beforeEach(async () => {
    page = new ExperimentResultsPage();
    app = new ApplicationPage();
    await browser.waitForAngularEnabled(false);
  });

  it('Should be displayed with right title', async () => {
    // Přejdu na stránku s výsledky experimentů
    await page.navigateTo();
    // Počkám, až se stránka ustálí
    await app.waitForPageChange('Výsledky experimentů');
    // Ověřím, že název stránky je opravdu správný
    expect(await app.applicationHeader.getText()).toEqual('Výsledky experimentů');
  });

  it('Should not contains experiment records', async () => {
    // Přejdu na stránku s výsledky experimentů
    await page.navigateTo();
    // Počkám, až se stránka ustálí
    await app.waitForPageChange('Výsledky experimentů');
    // Zkontroluji, že stránka neobsahuje žádné výsledky experimentůl
    expect(await page.experimentResultsEmptyHeader.getText()).toEqual('Nebyly nalezeny žádné výsledky experimenty...');
  });

});
