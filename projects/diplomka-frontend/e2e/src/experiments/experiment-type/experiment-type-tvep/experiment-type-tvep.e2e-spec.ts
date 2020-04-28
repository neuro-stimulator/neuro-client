import { browser, protractor } from 'protractor';

import { ExperimentType } from '@stechy1/diplomka-share';

import { ApplicationPage } from '../../../app.po';
import { ExperimentsPage } from '../../experiments.po';
import { ExperimentTypeAbstractSpecHelper } from '../experiment-type-abstract-helper.spec';
import { ExperimentTypeTvepPage } from './experiment-type-tvep.po';

describe('Experiment TVEP', () => {

  let app: ApplicationPage;
  let experiments: ExperimentsPage;
  let page: ExperimentTypeTvepPage;
  let experimentHelper: ExperimentTypeAbstractSpecHelper;

  beforeEach(async () => {
    page = new ExperimentTypeTvepPage();
    experiments = new ExperimentsPage();
    app = new ApplicationPage();
    experimentHelper = new ExperimentTypeAbstractSpecHelper(app, experiments, page);
    await browser.waitForAngularEnabled(false);
  });

  it('Should be able to create new experiment, check the list and delete the created experiment.', async () => {
    await experimentHelper.testExperimentLivecycle(ExperimentType.TVEP, 'tvep-test');
  });

  it('Should contains all necessary inputs', async () => {
    // Vygenerujeme náhodné jméno pro jistotu
    const experimentName = `tvep-input-check-${Math.random()}`;
    // Přejdi na hlavní stránku
    await experiments.navigateTo();
    // Přejdi do editoru CVEP experimentu
    await experimentHelper.goToNewExperimentPage(ExperimentType.TVEP);
    // Vyplním název experimentu
    await page.fillExperimentName(experimentName);
    // Počkám na validaci názvu
    await browser.wait(protractor.ExpectedConditions.elementToBeClickable(page.experimentSaveButton));
    // Uložím experiment, aby se zpřístupníly veškeré inputy
    await page.experimentSaveButton.click();
    // Ověř, že jsou přítomny všechny atributy
    await experimentHelper.testExperimentInputPresents();
    // Přejdu na stránku se všemi experimenty
    await experiments.navigateTo();
    // Počkám na načtení stránky se všemi experimenty
    await browser.wait(protractor.ExpectedConditions.visibilityOf(experiments.availableExperimentList), 5000);
    // A smažu vytvořený experiment
    await experiments.deleteAllExperiments();
  });

  it('Should not be able to create experiment with duplicated name', async () => {
    // Přejdi na hlavní stránku
    await experiments.navigateTo();
    // Spusť test na ověření nemožnosti vytvoření experimentu s duplikovaným názvem
    await experimentHelper.testInvalidName(ExperimentType.TVEP);
  });
});
