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

  beforeEach(async () => {
    page = new ExperimentTypeReaPage();
    experiments = new ExperimentsPage();
    app = new ApplicationPage();
    await browser.waitForAngularEnabled(false);
  });

  it('Should be able to create new experiment, check the list and delete the created experiment.', async () => {
    const experimentHelper: ExperimentTypeAbstractSpecHelper = new ExperimentTypeAbstractSpecHelper(app, experiments, page);
    await experimentHelper.testCreateNewExperiment(ExperimentType.REA, 'rea-test');
  });

});
