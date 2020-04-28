import { browser, by, element, ElementFinder } from 'protractor';

import { Page } from '../page';

export class PlayerPage implements Page {

  navigateTo(params: string[]): Promise<any> {
    return browser.get(`/player/${params[0]}/${params[1]}`) as Promise<any>;
  }

  findPlayerToolbar(): { upload: ElementFinder, run: ElementFinder, pause: ElementFinder, finish: ElementFinder, clear: ElementFinder } {
    const toolbar = element(by.className('control-panel-toolbar'));
    return {
      upload: toolbar.element(by.className('upload')),
      run: toolbar.element(by.className('run')),
      pause: toolbar.element(by.className('pause')),
      finish: toolbar.element(by.className('finish')),
      clear: toolbar.element(by.className('clear'))
    };
  }

}
