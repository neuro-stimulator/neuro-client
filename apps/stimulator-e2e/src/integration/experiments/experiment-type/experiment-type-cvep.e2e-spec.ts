import { ExperimentType } from '@stechy1/diplomka-share';

import { ApplicationPage } from "../../../support/app.po";
import { ExperimentsPage } from "../../../support/experiments/experiments.po";
import { ExperimentTypeCvepPage } from "../../../support/experiments/experiment-type/experiment-type-cvep.po";
import { ExperimentTypeAbstractSpecHelper } from "./experiment-type-abstract-helper.spec";


context('Experiment CVEP', () => {

  let app: ApplicationPage;
  let experiments: ExperimentsPage;
  let page: ExperimentTypeCvepPage;
  let experimentHelper: ExperimentTypeAbstractSpecHelper;

  beforeEach(() => {
    page = new ExperimentTypeCvepPage();
    experiments = new ExperimentsPage();
    app = new ApplicationPage();
    experimentHelper = new ExperimentTypeAbstractSpecHelper(app, experiments, page);
  });

  it('Should be able to create new experiment, check the list and delete the created experiment.', () => {
    experimentHelper.testExperimentLivecycle(ExperimentType.CVEP, 'cvep-test');
  });

  it('Should contains all necessary inputs', () => {
    // Přejdi na hlavní stránku
    experiments.navigateTo();
    // Přejdi do editoru CVEP experimentu
    experimentHelper.goToNewExperimentPage(ExperimentType.CVEP);
    // Ověř, že jsou přítomny všechny atributy
    experimentHelper.testExperimentInputPresents();
  });

  it('Should not be able to create experiment with duplicated name', () => {
    // Přejdi na hlavní stránku
    experiments.navigateTo();
    // Spusť test na ověření nemožnosti vytvoření experimentu s duplikovaným názvem
    experimentHelper.testInvalidName(ExperimentType.CVEP);
  });

});
