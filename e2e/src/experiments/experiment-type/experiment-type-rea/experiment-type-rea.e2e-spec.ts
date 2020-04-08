import { browser } from 'protractor';

import { ExperimentType } from '@stechy1/diplomka-share';

import { ApplicationPage } from '../../../app.po';
import { ExperimentsPage } from '../../experiments.po';
import { ExperimentTypeAbstractSpecHelper } from '../experiment-type-abstract-helper.spec';
import { ExperimentTypeReaPage } from './experiment-type-rea.po';

describe('Experiment REA', () => {

  let app: ApplicationPage;
  let experiments: ExperimentsPage;
  let page: ExperimentTypeReaPage;
  let experimentHelper: ExperimentTypeAbstractSpecHelper;

  beforeEach(async () => {
    page = new ExperimentTypeReaPage();
    experiments = new ExperimentsPage();
    app = new ApplicationPage();
    experimentHelper = new ExperimentTypeAbstractSpecHelper(app, experiments, page);
    await browser.waitForAngularEnabled(false);
  });

  it('Should be able to create new experiment, check the list and delete the created experiment.', async () => {
    await experimentHelper.testExperimentLivecycle(ExperimentType.REA, 'rea-test');
  });

  it('Should contains all necessary inputs', async () => {
    // Přejdi na hlavní stránku
    await experiments.navigateTo();
    // Přejdi do editoru CVEP experimentu
    await experimentHelper.goToNewExperimentPage(ExperimentType.REA);
    // Ověř, že jsou přítomny všechny atributy
    await experimentHelper.testExperimentInputPresents();
  });

  it('Should not be able to create experiment with duplicated name', async () => {
    // Přejdi na hlavní stránku
    await experiments.navigateTo();
    // Spusť test na ověření nemožnosti vytvoření experimentu s duplikovaným názvem
    await experimentHelper.testInvalidName(ExperimentType.REA);
  });
});
