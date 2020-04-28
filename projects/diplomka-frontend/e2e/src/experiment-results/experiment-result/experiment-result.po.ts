import { browser, by, element, ElementFinder } from 'protractor';

import { Page } from '../../page';

export class ExperimentResultPage implements Page {

  navigateTo(params: string[]): Promise<any> {
    return browser.get(`/results/${params[0]}`) as Promise<any>;
  }

  get fieldExperimentResultName(): ElementFinder {
    return element(by.id('experiment-result-name'));
  }

  get elementExperimentVisualisation(): ElementFinder {
    return element(by.className('experiment-visualisation'));
  }

  get elementExperimentOffsetEditor(): ElementFinder {
    return element(by.className('experiment-offset-editor'));
  }

  get elementDownloadEdperimentResultData(): ElementFinder {
      return element(by.id('download-experiment-result-data'));
  }
}
