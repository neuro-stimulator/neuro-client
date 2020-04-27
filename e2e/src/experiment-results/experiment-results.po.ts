import { browser, by, element, ElementFinder} from 'protractor';

import { Page } from '../page';
import { deleteAllRecords } from '../share';

export class ExperimentResultsPage implements Page {

  navigateTo(): Promise<any> {
    return browser.get('/results') as Promise<any>;
  }

  get experimentResultsEmptyHeader(): ElementFinder {
    return element(by.id('experiment-results-not-found'));
  }

  public get experimentResultList(): ElementFinder {
    return element(by.className('experiment-result-list'));
  }

  public findExperimentResultRowByName(name: string): ElementFinder {
    return this.experimentResultList.element(by.css(`li[data-experiment-result-name=${name}]`));
  }

  public findExperimentResultToolbar(name: string): ElementFinder {
    return this.findExperimentResultRowByName(name).element(by.className('experiment-result-toolbar'));
  }

  public findExperimentResultToolbarButtons(name: string): {view: ElementFinder, delete: ElementFinder} {
    const toolbar: ElementFinder = this.findExperimentResultToolbar(name);
    return {
      view: toolbar.element(by.className('view')),
      delete: toolbar.element(by.className('delete'))
    };
  }

  async deleteAllExperimentResults(): Promise<any> {
    const trashButtons = await this.experimentResultList.all(by.css('.fa-trash.delete'));
    await deleteAllRecords(trashButtons);
  }
}
