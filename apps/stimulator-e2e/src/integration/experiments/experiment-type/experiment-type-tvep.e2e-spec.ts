import { ExperimentType } from '@stechy1/diplomka-share';
import { ApplicationPage } from "../../../support/app.po";
import { ExperimentsPage } from "../../../support/experiments/experiments.po";
import { ExperimentTypeTvepPage } from "../../../support/experiments/experiment-type/experiment-type-tvep.po";
import { ExperimentTypeAbstractSpecHelper } from "./experiment-type-abstract-helper.spec";

describe('Experiment TVEP', () => {

  let app: ApplicationPage;
  let experiments: ExperimentsPage;
  let page: ExperimentTypeTvepPage;
  let experimentHelper: ExperimentTypeAbstractSpecHelper;

  beforeEach(() => {
    page = new ExperimentTypeTvepPage();
    experiments = new ExperimentsPage();
    app = new ApplicationPage();
    experimentHelper = new ExperimentTypeAbstractSpecHelper(app, experiments, page);
  });

  it('Should be able to create new experiment, check the list and delete the created experiment.', () => {
    experimentHelper.testExperimentLivecycle(ExperimentType.TVEP, 'tvep-test');
  });

  it('Should contains all necessary inputs', () => {
    // Vygenerujeme náhodné jméno pro jistotu
    const experimentName = `tvep-input-check-${Math.random()}`;
    // Přejdi na hlavní stránku
    experiments.navigateTo();
    // Přejdi do editoru CVEP experimentu
    experimentHelper.goToNewExperimentPage(ExperimentType.TVEP);
    // Vyplním název experimentu
    page.fillExperimentName(experimentName);
    // Počkám na validaci názvu
    // browser.wait(protractor.ExpectedConditions.elementToBeClickable(page.experimentSaveButton));
    // Uložím experiment, aby se zpřístupníly veškeré inputy
    page.experimentSaveButton.click();
    // Ověř, že jsou přítomny všechny atributy
    experimentHelper.testExperimentInputPresents();
    // Přejdu na stránku se všemi experimenty
    experiments.navigateTo();
    // Počkám na načtení stránky se všemi experimenty
    // browser.wait(protractor.ExpectedConditions.visibilityOf(experiments.availableExperimentList), 5000);
    // A smažu vytvořený experiment
    experiments.deleteAllExperiments();
  });

  it('Should not be able to create experiment with duplicated name', () => {
    // Přejdi na hlavní stránku
    experiments.navigateTo();
    // Spusť test na ověření nemožnosti vytvoření experimentu s duplikovaným názvem
    experimentHelper.testInvalidName(ExperimentType.TVEP);
  });
});
