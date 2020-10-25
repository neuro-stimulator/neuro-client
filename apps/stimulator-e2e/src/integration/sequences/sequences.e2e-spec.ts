import { ExperimentType } from '@stechy1/diplomka-share';

import { ApplicationPage } from '../../support/app.po';
import { SequencesPage } from '../../support/sequences/sequences.po';
import { ExperimentsPage } from '../../support/experiments/experiments.po';
import { ExperimentTypeErpPage } from '../../support/experiments/experiment-type/experiment-type-erp.po';
import { SequencePage } from '../../support/sequences/sequence/sequence.po';
import { ExperimentTypeAbstractSpecHelper } from '../experiments/experiment-type/experiment-type-abstract-helper.spec';
import { SequencesHelper } from './sequences-helper.spec';

describe('Sequences page', () => {

  let app: ApplicationPage;
  let page: SequencesPage;
  let experimentsPage: ExperimentsPage;
  let erpPage: ExperimentTypeErpPage;
  let experimentHelper: ExperimentTypeAbstractSpecHelper;
  let sequencesPage: SequencesPage;
  let sequencePage: SequencePage;
  let sequencesHelper: SequencesHelper;

  beforeEach(() => {
    page = new SequencesPage();
    app = new ApplicationPage();
    experimentsPage = new ExperimentsPage();
    erpPage = new ExperimentTypeErpPage();
    experimentHelper = new ExperimentTypeAbstractSpecHelper(app, experimentsPage, erpPage);
    sequencesPage = new SequencesPage();
    sequencePage = new SequencePage();
    sequencesHelper = new SequencesHelper(sequencesPage, sequencePage);
  });

  it('Should be displayed with right title', () => {
    // Přejdu na stránku sekvenci
    page.navigateTo();
    // Počkám na synchronizaci
    app.waitForPageChange('Sekvence');
    // expect(app.applicationHeader.getText()).toEqual('Sekvence');
    app.applicationHeader.should('have.text', 'Sekvence');
  });

  it('Should contains button for new experiment', () => {
    // Přejdu na stránku sekvenci
    page.navigateTo();
    // Počkám na synchronizaci
    // expect(page.sequencesNewButton.isPresent()).toBeTruthy();
    page.sequencesNewButton.should('be.visible');
  });

  it('Should not contains experiment records', () => {
    // Přejdu na stránku sekvenci
    page.navigateTo();
    // Počkám na synchronizaci
    app.waitForPageChange('Sekvence');
    // expect(page.sequencesEmptyHeader.getText()).toEqual('Nebyly nalezeny žádné sekvence...');
    page.sequencesEmptyHeader.should('have.text', 'Nebyly nalezeny žádné sekvence...');
    // expect(page.sequenceList.isDisplayed()).toBeFalsy();
    page.sequenceList.should('not.exist');
  });

  it('Should be able to create new sequence', () => {
    const experimentName = 'ERP';
    const sequenceName = 'sequence';
    const sequenceSize = 20;
    // Přejdu na stránku s experimenty
    experimentsPage.navigateTo();
    // Nechám automatizovaně vytvořit nový erp experiment
    experimentHelper.createNewExperiment(experimentName, ExperimentType.ERP);
    // Automaticky vytvořím novou sekvenci
    // sequencesHelper.createSequence(sequenceName, sequenceSize, experimentName);
    // Přejdu na stránku se všemi sekvencemi
    sequencesPage.navigateTo();
    // Počkám na synchronizaci
    app.waitForPageChange('Sekvence');
    // Počkám až se zobrazí seznam všech sekvencí
    // browser.wait(protractor.ExpectedConditions.visibilityOf(sequencesPage.sequenceList));
    // Vymažu všechny vytvořené sekvence
    sequencesPage.deleteAllSequences();
    // Přejdu na stránku s experimenty
    experimentsPage.navigateTo();
    // Počkám, až se zobrazí seznam všech experimentů
    // browser.wait(protractor.ExpectedConditions.visibilityOf(experimentsPage.availableExperimentList));
    // Vymažu také všechny vytvořené experimenty
    experimentsPage.deleteAllExperiments();
  });

});
