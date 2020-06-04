import { ExperimentType } from '@stechy1/diplomka-share';

import { ApplicationPage } from "../../../support/app.po";
import { ExperimentsPage } from "../../../support/experiments/experiments.po";
import { ExperimentTypeReaPage } from "../../../support/experiments/experiment-type/experiment-type-rea.po";
import { ExperimentTypeAbstractSpecHelper } from "./experiment-type-abstract-helper.spec";

describe('Experiment REA', () => {

  let app: ApplicationPage;
  let experiments: ExperimentsPage;
  let page: ExperimentTypeReaPage;
  let experimentHelper: ExperimentTypeAbstractSpecHelper;

  beforeEach(() => {
    page = new ExperimentTypeReaPage();
    experiments = new ExperimentsPage();
    app = new ApplicationPage();
    experimentHelper = new ExperimentTypeAbstractSpecHelper(app, experiments, page);
  });

  it('Should be able to create new experiment, check the list and delete the created experiment.', () => {
    experimentHelper.testExperimentLivecycle(ExperimentType.REA, 'rea-test');
  });

  it('Should contains all necessary inputs', () => {
    // Přejdi na hlavní stránku
    experiments.navigateTo();
    // Přejdi do editoru CVEP experimentu
    experimentHelper.goToNewExperimentPage(ExperimentType.REA);
    // Ověř, že jsou přítomny všechny atributy
    experimentHelper.testExperimentInputPresents();
  });

  it('Should not be able to create experiment with duplicated name', () => {
    // Přejdi na hlavní stránku
    experiments.navigateTo();
    // Spusť test na ověření nemožnosti vytvoření experimentu s duplikovaným názvem
    experimentHelper.testInvalidName(ExperimentType.REA);
  });
});
