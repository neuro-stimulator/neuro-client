import { browser } from 'protractor';

import { ExperimentType } from '@stechy1/diplomka-share';

import { ApplicationPage } from '../../../app.po';
import { ExperimentsPage } from '../../experiments.po';
import { ExperimentTypeAbstractSpecHelper } from '../experiment-type-abstract-helper.spec';
import { ExperimentTypeCvepPage } from './experiment-type-cvep.po';

describe('Experiment CVEP', () => {

  let app: ApplicationPage;
  let experiments: ExperimentsPage;
  let page: ExperimentTypeCvepPage;
  let experimentHelper: ExperimentTypeAbstractSpecHelper;

  beforeEach(async () => {
    page = new ExperimentTypeCvepPage();
    experiments = new ExperimentsPage();
    app = new ApplicationPage();
    experimentHelper = new ExperimentTypeAbstractSpecHelper(app, experiments, page);
    await browser.waitForAngularEnabled(false);
  });

  it('Should be able to create new experiment, check the list and delete the created experiment.', async () => {
    await experimentHelper.testExperimentLivecycle(ExperimentType.CVEP, 'cvep-test');
  });

  it('Should contains all necessary inputs', async () => {
    // Přejdi na hlavní stránku
    await experiments.navigateTo();
    // Přejdi do editoru CVEP experimentu
    await experimentHelper.goToNewExperimentPage(ExperimentType.CVEP);
    // Ověř, že jsou přítomny všechny atributy
    await experimentHelper.testExperimentInputPresents();
  });

});
