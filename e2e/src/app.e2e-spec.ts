import { browser, ElementFinder, protractor } from 'protractor';

import { ExperimentType } from '@stechy1/diplomka-share';

import { ApplicationPage } from './app.po';
import { ExperimentTypeCvepPage } from './experiments/experiment-type/experiment-type-cvep/experiment-type-cvep.po';
import { ExperimentTypeAbstractSpecHelper } from './experiments/experiment-type/experiment-type-abstract-helper.spec';
import { ExperimentsPage } from './experiments/experiments.po';
import { PlayerPage } from './player/player.po';
import { ExperimentResultsPage } from './experiment-results/experiment-results.po';
import { ExperimentResultPage } from './experiment-results/experiment-result/experiment-result.po';
import { ExperimentTypeErpPage } from './experiments/experiment-type/experiment-type-erp/experiment-type-erp.po';
import { ExperimentTypeFvepPage } from './experiments/experiment-type/experiment-type-fvep/experiment-type-fvep.po';
import { ExperimentTypeTvepPage } from './experiments/experiment-type/experiment-type-tvep/experiment-type-tvep.po';
import { ExperimentTypeReaPage } from './experiments/experiment-type/experiment-type-rea/experiment-type-rea.po';
import { SequencesPage } from './sequences/sequences.po';

describe('Top level e2e tests', () => {
  let page: ApplicationPage;
  let experimentsPage: ExperimentsPage;
  let experimentResultsPage: ExperimentResultsPage;
  let experimentResultPage: ExperimentResultPage;
  let playerPage: PlayerPage;
  let sequencesPage: SequencesPage;

  beforeEach(async () => {
    page = new ApplicationPage();
    experimentsPage = new ExperimentsPage();
    experimentResultsPage = new ExperimentResultsPage();
    experimentResultPage = new ExperimentResultPage();
    playerPage = new PlayerPage();
    sequencesPage = new SequencesPage();
    await browser.waitForAngularEnabled(false);
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
    it(`should test full exeperiment workflow for type: ${experiment.name}`, async () => {
      // Založím nový experiment s výchozími hodnotami
      await experiment.helper().createNewExperiment(experiment.name, experiment.type);
      // Nechám najít toolbar k experimentu
      const experimentToolbar: { run: ElementFinder, edit: ElementFinder, delete: ElementFinder } = await experimentsPage.findExperimentToolbar(experiment.name);
      // Kliknu v toolbaru na tlačítko run, čímž se přesměruji na stránku přehrávače
      await experimentToolbar.run.click();
      // Počkám až se přesměruji na stránku s přehrávačem
      await browser.wait(protractor.ExpectedConditions.visibilityOf(page.applicationHeader), 5000);
      // Ověřím, že prehrávač experimentu obsahuje správný titulek
      expect(await page.applicationHeader.getText()).toBe(`Přehrávač experimentu: ${experiment.name}`);
      // Nechám najít toolbar přehrávače
      const playerToolbar: {
        upload: ElementFinder, run: ElementFinder, pause: ElementFinder, finish: ElementFinder,
        clear: ElementFinder
      } = await playerPage.findPlayerToolbar();
      // Na stránce přehrávače kliknu na tlačítko nahrát
      await playerToolbar.upload.click();
      // Počkám, až zmizí všechny notifikace
      await page.waitForNoToastVisible();
      // Kliknu na tlačítko spustit, čímž spustím celý experiment
      await playerToolbar.run.click();
      // Počkám, až zmizí všechny notifikace
      await page.waitForNoToastVisible();
      // V rámci testování zkusím experiment pozastavit a zase spustit
      await playerToolbar.pause.click();
      // Počkám, až zmizí všechny notifikace
      await page.waitForNoToastVisible();
      // Opětovné spuštění
      await playerToolbar.run.click();
      // Počkám, až zmizí všechny notifikace
      await page.waitForNoToastVisible();
      // Nakonec ukončím experiment, čímž bych měl být automaticky přesměrován na seznam výsledků experimentů
      await playerToolbar.finish.click();
      // Počkám až se přesměruji na stránku s výsledky experimentů
      await page.waitForPageChange('Výsledky experimentů');
      // Počkám, až se zobrazí seznam všech výsledků experimentů
      await browser.wait(protractor.ExpectedConditions.visibilityOf(experimentResultsPage.experimentResultList), 5000);
      // Počkám, až se zobrazí záznam s výsledkem experimentu
      await browser.wait(protractor.ExpectedConditions.visibilityOf(experimentResultsPage.findExperimentResultToolbar('Nepojmenováno')), 5000,
        'Toolbar pro záznam výsledku experimentu nebyl nalezen!');
      // Nechám najít toolbar vzniklého výsledku experimentu
      const experimentResultToolbar: { view: ElementFinder, delete: ElementFinder } = experimentResultsPage.findExperimentResultToolbarButtons('Nepojmenováno');
      // Počkám, až zmizí všechny notifikace
      await page.waitForNoToastVisible();
      // Přejdu na stránku s výsledkem experimentu
      await experimentResultToolbar.view.click();
      // Počkám až se přesměruji na stránku s výsledkem experimentu
      await page.waitForPageChange('Výsledek experimentu');
      // Počkám, až se zobrazí field pro zadání názvu experimentu
      await browser.wait(protractor.ExpectedConditions.visibilityOf(experimentResultPage.fieldExperimentResultName), 5000);
      // Přejdu zpět na přehled výsledků experimentů
      await experimentResultsPage.navigateTo();
      // Počkám až se přesměruji na stránku s výsledky experimentů
      await page.waitForPageChange('Výsledky experimentů');
      // Počkám, až se zobrazí seznam všech výsledků experimentů
      await browser.wait(protractor.ExpectedConditions.visibilityOf(experimentResultsPage.experimentResultList), 5000);
      // Počkám, až se zobrazí záznam s výsledkem experimentu
      await browser.wait(protractor.ExpectedConditions.visibilityOf(experimentResultsPage.findExperimentResultToolbar('Nepojmenováno')), 5000,
        'Toolbar pro záznam výsledku experimentu nebyl nalezen!');
      // Odstraním všechny dostupné výsledky experimentů
      await experimentResultsPage.deleteAllExperimentResults();
      // Přejdu na přehled sekvencí
      await sequencesPage.navigateTo();
      // Počkám, až se přesměruji na stránku sekvencí
      await page.waitForPageChange('Sekvence');
      // Počkám, až se zobrazí seznam všech výsledků sekvencí
      await browser.wait(protractor.ExpectedConditions.visibilityOf(sequencesPage.sequenceList), 5000);
      // Odstraním všechny dostupné sekvence
      await sequencesPage.deleteAllSequences();
      // Přejdu na přehled všech experimentů
      await experimentsPage.navigateTo();
      // Počkám až se přesměruji na stránku s výsledky experimentů
      await page.waitForPageChange('Experimenty');
      // A smažu i zde všechny experimenty
      await experimentsPage.deleteAllExperiments();
    });
  });

});
