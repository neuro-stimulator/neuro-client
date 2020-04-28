import { browser, by, element, ElementFinder } from 'protractor';

import { ExperimentType } from '@stechy1/diplomka-share';

import { Page } from '../page';
import { deleteAllRecords } from '../share';

export class ExperimentsPage implements Page {
  navigateTo(): Promise<any> {
    return browser.get('/experiments') as Promise<any>;
  }

  get experimentsEmptyHeader(): ElementFinder {
    return element(by.id('experiments-not-found'));
  }

  get experimentNewButton(): ElementFinder {
    return element(by.className('fab-toggler'));
  }

  get experimentTypeList(): ElementFinder {
    return element(by.className('fab-button-list'));
  }

  get availableExperimentList(): ElementFinder {
    return element(by.className('experiment-list'));
  }

  get addonButtonExperimentsFinder(): ElementFinder {
    return element(by.id('button-addon-experiments-finder'));
  }

  get addonButtonExperimentsFilter(): ElementFinder {
    return element(by.id('button-addon-experiments-filter'));
  }

  public findExperimentRowByName(name: string): ElementFinder {
    return element(by.css(`li[data-experiment-name=${name}]`));
  }

  findExperimentToolbar(name: string): {run: ElementFinder, edit: ElementFinder, delete: ElementFinder} {
    const toolbar: ElementFinder = this.findExperimentRowByName(name).element(by.className('experiment-toolbar'));
    return {
      run: toolbar.element(by.className('run')),
      edit: toolbar.element(by.className('edit')),
      delete: toolbar.element(by.className('delete'))
    };
  }


  async clickToNewExperiment(experimentType: ExperimentType) {
    // Zobrazení nabídky s tlačítky pro jednotlivé experimenty
    await this.experimentNewButton.click();
    // Zvolení vybraného tlačítka
    await this.experimentTypeList.element(by.buttonText(ExperimentType[experimentType])).click();
  }

  async deleteAllExperiments(): Promise<any> {
    const trashButtons = await this.availableExperimentList.all(by.css('.fa-trash.delete'));
    await deleteAllRecords(trashButtons);
  }
}
