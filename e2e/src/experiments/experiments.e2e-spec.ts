import { browser, by} from 'protractor';

import { ExperimentType } from '@stechy1/diplomka-share';

import { ApplicationPage } from '../app.po';
import { ExperimentsPage } from './experiments.po';

describe('Experiment list test', () => {

  let app: ApplicationPage;
  let page: ExperimentsPage;

  beforeEach(async () => {
    page = new ExperimentsPage();
    app = new ApplicationPage();
    await browser.waitForAngularEnabled(false);
  });

  it('Should be displayed with right title', async () => {
    await page.navigateTo();
    expect(app.applicationHeader.getText()).toEqual('Experimenty');
  });

  it('Should contains button for new experiment', async () => {
    await page.navigateTo();
    expect(page.experimentNewButton.isPresent()).toBeTruthy();
  });

  it('Should contains 5 buttons for new experiment', async () => {
    await page.experimentNewButton.click();
    expect(page.experimentTypeList.isPresent()).toBeTruthy();

    const buttons = await page.experimentTypeList.all(by.className('btn-secondary'));
    expect(buttons.length)
    .toBe(5);

    const experiments = [ExperimentType.ERP, ExperimentType.CVEP, ExperimentType.FVEP, ExperimentType.TVEP, ExperimentType.REA];
    for (const experiment of experiments) {
      const erp = await page.experimentTypeList.all(by.buttonText(ExperimentType[experiment]));
      expect(erp).toBeDefined();
    }
  });

  it('Should not contains experiment records', async () => {
    await page.navigateTo();

    // Synchronizace prohlížeče
    await browser.sleep(2000);
    expect(page.experimentsEmptyHeader.getText()).toEqual('Nebyly nalezeny žádné experimenty...');
  });

});
