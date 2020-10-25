import { ApplicationPage } from '../../../support/app.po';
import { ExperimentResultsPage } from '../../../support/experiment-results/experiment-results.po';

describe('Experiment results page', () => {

  let app: ApplicationPage;
  let page: ExperimentResultsPage;

  beforeEach(async () => {
    page = new ExperimentResultsPage();
    app = new ApplicationPage();
  });

  it('Should be displayed with right title', () => {
    // Přejdu na stránku s výsledky experimentů
    page.navigateTo();
    // Počkám, až se stránka ustálí
    app.waitForPageChange('Výsledky experimentů');
    // Ověřím, že název stránky je opravdu správný
    app.applicationHeader.should('have.text', 'Výsledky experimentů');
    // expect(await app.applicationHeader.getText()).toEqual('Výsledky experimentů');
  });

  it('Should not contains experiment result records', () => {
    // Přejdu na stránku s výsledky experimentů
    page.navigateTo();
    // Počkám, až se stránka ustálí
    app.waitForPageChange('Výsledky experimentů');
    // Zkontroluji, že stránka neobsahuje žádné výsledky experimentůl
    page.experimentResultsEmptyHeader.should('have.text', 'Nebyly nalezeny žádné výsledky experimentů...');
    // expect(await page.experimentResultsEmptyHeader.getText()).toEqual('Nebyly nalezeny žádné výsledky experimenty...');
  });

});
