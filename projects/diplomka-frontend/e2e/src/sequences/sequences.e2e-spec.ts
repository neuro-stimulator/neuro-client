import { browser, protractor } from 'protractor';

import { ExperimentType } from '@stechy1/diplomka-share';

import { ApplicationPage } from '../app.po';
import { ExperimentsPage } from '../experiments/experiments.po';
import { ExperimentTypeErpPage } from '../experiments/experiment-type/experiment-type-erp/experiment-type-erp.po';
import { ExperimentTypeAbstractSpecHelper } from '../experiments/experiment-type/experiment-type-abstract-helper.spec';
import { SequencesHelper } from './sequences-helper.spec';
import { SequencesPage } from './sequences.po';
import { SequencePage } from './sequence/sequence.po';

describe('Sequences page', () => {

  let app: ApplicationPage;
  let page: SequencesPage;
  let experimentsPage: ExperimentsPage;
  let erpPage: ExperimentTypeErpPage;
  let experimentHelper: ExperimentTypeAbstractSpecHelper;
  let sequencesPage: SequencesPage;
  let sequencePage: SequencePage;
  let sequencesHelper: SequencesHelper;

  beforeEach(async () => {
    page = new SequencesPage();
    app = new ApplicationPage();
    experimentsPage = new ExperimentsPage();
    erpPage = new ExperimentTypeErpPage();
    experimentHelper = new ExperimentTypeAbstractSpecHelper(app, experimentsPage, erpPage);
    sequencesPage = new SequencesPage();
    sequencePage = new SequencePage();
    sequencesHelper = new SequencesHelper(sequencesPage, sequencePage);
    await browser.waitForAngularEnabled(false);
  });

  it('Should be displayed with right title', async () => {
    // Přejdu na stránku sekvenci
    await page.navigateTo();
    // Počkám na synchronizaci
    await app.waitForPageChange('Sekvence');
    await expect(await app.applicationHeader.getText()).toEqual('Sekvence');
  });

  it('Should contains button for new experiment', async () => {
    // Přejdu na stránku sekvenci
    await page.navigateTo();
    // Počkám na synchronizaci
    await expect(page.sequencesNewButton.isPresent()).toBeTruthy();
  });

  it('Should not contains experiment records', async () => {
    // Přejdu na stránku sekvenci
    await page.navigateTo();
    // Počkám na synchronizaci
    await app.waitForPageChange('Sekvence');
    await expect(await page.sequencesEmptyHeader.getText()).toEqual('Nebyly nalezeny žádné sekvence...');
    await expect(await page.sequenceList.isDisplayed()).toBeFalsy();
  });

  it('Should be able to create new sequence', async () => {
    const experimentName = 'ERP';
    const sequenceName = 'sequence';
    const sequenceSize = 20;
    // Přejdu na stránku s experimenty
    await experimentsPage.navigateTo();
    // Nechám automatizovaně vytvořit nový erp experiment
    await experimentHelper.createNewExperiment(experimentName, ExperimentType.ERP);
    // Automaticky vytvořím novou sekvenci
    await sequencesHelper.createSequence(sequenceName, sequenceSize, experimentName);
    // Přejdu na stránku se všemi sekvencemi
    await sequencesPage.navigateTo();
    // Počkám na synchronizaci
    await app.waitForPageChange('Sekvence');
    // Počkám až se zobrazí seznam všech sekvencí
    await browser.wait(protractor.ExpectedConditions.visibilityOf(sequencesPage.sequenceList));
    // Vymažu všechny vytvořené sekvence
    await sequencesPage.deleteAllSequences();
    // Přejdu na stránku s experimenty
    await experimentsPage.navigateTo();
    // Počkám, až se zobrazí seznam všech experimentů
    await browser.wait(protractor.ExpectedConditions.visibilityOf(experimentsPage.availableExperimentList));
    // Vymažu také všechny vytvořené experimenty
    await experimentsPage.deleteAllExperiments();
  });

});
