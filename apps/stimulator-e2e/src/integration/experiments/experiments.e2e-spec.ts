import { ExperimentType } from '@stechy1/diplomka-share';

import { ApplicationPage } from '../../support/app.po';
import { ExperimentsPage } from '../../support/experiments/experiments.po';

describe('Experiment list test', () => {

  let app: ApplicationPage;
  let page: ExperimentsPage;

  beforeEach(() => {
    page = new ExperimentsPage();
    app = new ApplicationPage();
  });

  it('Should be displayed with right title', () => {
    page.navigateTo();

    app.applicationHeader.should('have.text', 'Experimenty');
    // expect(await app.applicationHeader.getText()).toEqual('Experimenty');
  });

  it('Should contains button for new experiment', () => {
    page.navigateTo();

    page.experimentNewButton.should('be.visible');
    // expect(page.experimentNewButton.isPresent()).toBeTruthy();
  });

  it('Should contains 5 buttons for new experiment', () => {
    page.experimentNewButton.click();
    page.experimentTypeList.should('be.visible');
    // expect(page.experimentTypeList.isPresent()).toBeTruthy();

    const buttons = page.experimentTypeList.find('.btn-secondary');
    // const buttons = await page.experimentTypeList.all(by.className('btn-secondary'));
    buttons.should('have.length', 5);
    // expect(buttons.length).toBe(5);

    const experiments = [ExperimentType.ERP, ExperimentType.CVEP, ExperimentType.FVEP, ExperimentType.TVEP, ExperimentType.REA];
    for (const experiment of experiments) {
      const button = page.experimentTypeList.contains(ExperimentType[experiment]);
      // const erp = await page.experimentTypeList.all(by.buttonText(ExperimentType[experiment]));
      button.should('exist');
      // expect(erp).toBeDefined();
    }
  });

  it('Should not contains experiment records', () => {
    page.navigateTo();

    page.experimentsEmptyHeader.should('have.text', 'Nebyly nalezeny žádné experimenty...');
    // expect(await page.experimentsEmptyHeader.getText()).toEqual('Nebyly nalezeny žádné experimenty...');
  });

  it('Should contains addon buttons for filter and finding experients', () => {
    page.navigateTo();

    page.addonButtonExperimentsFilter.should('not.exist');
    page.addonButtonExperimentsFinder.should('not.exist');
    app.pageToolsButton.should('exist');

    // expect(page.addonButtonExperimentsFilter).toBeDefined('Addon tlačítko pro filtrování experimentů nebylo nalezeno!');
    // expect(page.addonButtonExperimentsFinder).toBeDefined('Addon tlačítko pro vyhledávání experimentů nebylo nalezeno!');
    // expect(app.pageToolsButton).toBeDefined('Tlačítko pro zobrazení nastavení experimentů nebylo nalezeno!');
  });

});
