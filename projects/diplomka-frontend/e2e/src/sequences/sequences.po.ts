import { browser, by, element, ElementFinder} from 'protractor';

import { Page } from '../page';
import { deleteAllRecords } from '../share';

export class SequencesPage implements Page {

  navigateTo(): Promise<any> {
    return browser.get('/sequences') as Promise<any>;
  }

  get sequencesEmptyHeader(): ElementFinder {
    return element(by.id('sequences-not-found'));
  }

  get sequencesNewButton(): ElementFinder {
    return element(by.className('fab-toggler'));
  }

  get sequenceList(): ElementFinder {
    return element(by.className('sequence-list'));
  }

  public findSequenceRowByName(name: string): ElementFinder {
    return this.sequenceList.element(by.css(`li[data-sequence-name=${name}]`));
  }

  public findSequenceToolbar(name: string): ElementFinder {
    return this.findSequenceRowByName(name).element(by.className('sequence-toolbar'));
  }

  public findSequenceToolbarButtons(name: string): {view: ElementFinder, delete: ElementFinder} {
    const toolbar: ElementFinder = this.findSequenceToolbar(name);
    return {
      view: toolbar.element(by.className('view')),
      delete: toolbar.element(by.className('delete'))
    };
  }

  async deleteAllSequences(): Promise<any> {
    const trashButtons = await this.sequenceList.all(by.css('.fa-trash.delete'));
    await deleteAllRecords(trashButtons);
  }

}
