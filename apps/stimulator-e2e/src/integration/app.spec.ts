import { ExperimentType } from '@stechy1/diplomka-share';

import { ApplicationPage } from "../support/app.po";
import { ExperimentsPage } from "../support/experiments/experiments.po";
import { ExperimentResultsPage } from "../support/experiment-results/experiment-results.po";
import { ExperimentResultPage } from "../support/experiment-results/experiment-result/experiment-result.po";
import { PlayerPage } from "../support/player/player.po";
import { SequencesPage } from "../support/sequences/sequences.po";
import { ExperimentTypeErpPage } from "../support/experiments/experiment-type/experiment-type-erp.po";
import { ExperimentTypeCvepPage } from "../support/experiments/experiment-type/experiment-type-cvep.po";
import { ExperimentTypeFvepPage } from "../support/experiments/experiment-type/experiment-type-fvep.po";
import { ExperimentTypeTvepPage } from "../support/experiments/experiment-type/experiment-type-tvep.po";
import { ExperimentTypeReaPage } from "../support/experiments/experiment-type/experiment-type-rea.po";
import { ExperimentTypeAbstractSpecHelper } from "./experiments/experiment-type/experiment-type-abstract-helper.spec";


describe('Top level e2e tests', () => {
  let page: ApplicationPage;
  let experimentsPage: ExperimentsPage;
  let experimentResultsPage: ExperimentResultsPage;
  let experimentResultPage: ExperimentResultPage;
  let playerPage: PlayerPage;
  let sequencesPage: SequencesPage;

  beforeEach(() => {
    page = new ApplicationPage();
    experimentsPage = new ExperimentsPage();
    experimentResultsPage = new ExperimentResultsPage();
    experimentResultPage = new ExperimentResultPage();
    playerPage = new PlayerPage();
    sequencesPage = new SequencesPage();
  });

  const EXPERIMENTS: { type: ExperimentType, name: string, helper: () => ExperimentTypeAbstractSpecHelper }[] = [
    {
      type: ExperimentType.ERP,
      name: ExperimentType[ExperimentType.ERP],
      helper: () => new ExperimentTypeAbstractSpecHelper(page, experimentsPage, new ExperimentTypeErpPage())
    },
    {
      type: ExperimentType.CVEP,
      name: ExperimentType[ExperimentType.CVEP],
      helper: () => new ExperimentTypeAbstractSpecHelper(page, experimentsPage, new ExperimentTypeCvepPage())
    },
    {
      type: ExperimentType.FVEP,
      name: ExperimentType[ExperimentType.FVEP],
      helper: () => new ExperimentTypeAbstractSpecHelper(page, experimentsPage, new ExperimentTypeFvepPage())
    },
    {
      type: ExperimentType.TVEP,
      name: ExperimentType[ExperimentType.TVEP],
      helper: () => new ExperimentTypeAbstractSpecHelper(page, experimentsPage, new ExperimentTypeTvepPage())
    },
    {
      type: ExperimentType.REA,
      name: ExperimentType[ExperimentType.REA],
      helper: () => new ExperimentTypeAbstractSpecHelper(page, experimentsPage, new ExperimentTypeReaPage())
    }
  ];

  EXPERIMENTS.forEach(experiment => {
    it(`should test full exeperiment workflow for type: ${experiment.name}`, () => {
      // Založím nový experiment s výchozími hodnotami
      experiment.helper().createNewExperiment(experiment.name, experiment.type);
      // Nechám najít toolbar k experimentu
      const experimentToolbar: {
        run: Cypress.Chainable<JQuery<HTMLElement>>,
        edit: Cypress.Chainable<JQuery<HTMLElement>>,
        delete: Cypress.Chainable<JQuery<HTMLElement>>
      } = experimentsPage.findExperimentToolbar(experiment.name);
      // Kliknu v toolbaru na tlačítko run, čímž se přesměruji na stránku přehrávače
      experimentToolbar.run.click();
      // Počkám až se přesměruji na stránku s přehrávačem
      // browser.wait(protractor.ExpectedConditions.visibilityOf(page.applicationHeader), 5000);
      // Ověřím, že prehrávač experimentu obsahuje správný titulek
      page.waitForPageChange(`Přehrávač experimentu: ${experiment.name}`)
      // expect(page.applicationHeader.getText()).toBe(`Přehrávač experimentu: ${experiment.name}`);
      // Nechám najít toolbar přehrávače
      const playerToolbar: {
        upload: Cypress.Chainable<JQuery<HTMLElement>>,
        run: Cypress.Chainable<JQuery<HTMLElement>>,
        pause: Cypress.Chainable<JQuery<HTMLElement>>,
        finish: Cypress.Chainable<JQuery<HTMLElement>>,
        clear: Cypress.Chainable<JQuery<HTMLElement>>
      } = playerPage.findPlayerToolbar();
      // Na stránce přehrávače kliknu na tlačítko nahrát
      playerToolbar.upload.click();
      // Počkám, až zmizí všechny notifikace
      page.waitForNoToastVisible();
      // Kliknu na tlačítko spustit, čímž spustím celý experiment
      playerToolbar.run.click();
      // Počkám, až zmizí všechny notifikace
      page.waitForNoToastVisible();
      // V rámci testování zkusím experiment pozastavit a zase spustit
      playerToolbar.pause.click();
      // Počkám, až zmizí všechny notifikace
      page.waitForNoToastVisible();
      // Opětovné spuštění
      playerToolbar.run.click();
      // Počkám, až zmizí všechny notifikace
      page.waitForNoToastVisible();
      // Nakonec ukončím experiment, čímž bych měl být automaticky přesměrován na seznam výsledků experimentů
      playerToolbar.finish.click();
      // Počkám až se přesměruji na stránku s výsledky experimentů
      page.waitForPageChange('Výsledky experimentů');
      // Počkám, až se zobrazí seznam všech výsledků experimentů
      experimentResultsPage.experimentResultList.should('be.visible');
      // browser.wait(protractor.ExpectedConditions.visibilityOf(experimentResultsPage.experimentResultList), 5000);
      // Počkám, až se zobrazí záznam s výsledkem experimentu
      experimentResultsPage.findExperimentResultToolbar('Nepojmenováno').should('be.visible');
      // browser.wait(protractor.ExpectedConditions.visibilityOf(experimentResultsPage.findExperimentResultToolbar('Nepojmenováno')), 5000,
      //   'Toolbar pro záznam výsledku experimentu nebyl nalezen!');
      // Nechám najít toolbar vzniklého výsledku experimentu
      const experimentResultToolbar: { view: Cypress.Chainable<JQuery<HTMLElement>> , delete: Cypress.Chainable<JQuery<HTMLElement>>  } = experimentResultsPage.findExperimentResultToolbarButtons('Nepojmenováno');
      // Počkám, až zmizí všechny notifikace
      page.waitForNoToastVisible();
      // Přejdu na stránku s výsledkem experimentu
      experimentResultToolbar.view.click();
      // Počkám až se přesměruji na stránku s výsledkem experimentu
      page.waitForPageChange('Výsledek experimentu');
      // Počkám, až se zobrazí field pro zadání názvu experimentu
      experimentResultPage.fieldExperimentResultName.should('be.visible');
      // browser.wait(protractor.ExpectedConditions.visibilityOf(experimentResultPage.fieldExperimentResultName), 5000);
      // Přejdu zpět na přehled výsledků experimentů
      experimentResultsPage.navigateTo();
      // Počkám až se přesměruji na stránku s výsledky experimentů
      page.waitForPageChange('Výsledky experimentů');
      // Počkám, až se zobrazí seznam všech výsledků experimentů
      experimentResultsPage.experimentResultList.should('be.visible');
      // browser.wait(protractor.ExpectedConditions.visibilityOf(experimentResultsPage.experimentResultList), 5000);
      // Počkám, až se zobrazí záznam s výsledkem experimentu
      experimentResultsPage.findExperimentResultToolbar('Nepojmenováno').should('be.visible');
      // browser.wait(protractor.ExpectedConditions.visibilityOf(experimentResultsPage.findExperimentResultToolbar('Nepojmenováno')), 5000,
      //   'Toolbar pro záznam výsledku experimentu nebyl nalezen!');
      // Odstraním všechny dostupné výsledky experimentů
      experimentResultsPage.deleteAllExperimentResults();
      // Přejdu na přehled sekvencí
      sequencesPage.navigateTo();
      // Počkám, až se přesměruji na stránku sekvencí
      page.waitForPageChange('Sekvence');
      // Počkám, až se zobrazí seznam všech výsledků sekvencí
      experimentResultsPage.experimentResultList.should('be.visible');
      // browser.wait(protractor.ExpectedConditions.visibilityOf(sequencesPage.sequenceList), 5000);
      // Odstraním všechny dostupné sekvence
      sequencesPage.deleteAllSequences();
      // Přejdu na přehled všech experimentů
      experimentsPage.navigateTo();
      // Počkám až se přesměruji na stránku s výsledky experimentů
      page.waitForPageChange('Experimenty');
      // A smažu i zde všechny experimenty
      experimentsPage.deleteAllExperiments();
    });
  });

});
