import { Page } from '../page';
import { deleteAllRecords } from '../share';

export class SequencesPage implements Page {

  navigateTo(): void {
    cy.visit('/sequences');
  }

  get sequencesEmptyHeader(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#sequences-not-found');
  }

  get sequencesNewButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.fab-toggler');
  }

  get sequenceList(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.sequence-list');
  }

  public findSequenceRowByName(name: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.sequenceList.get((`li[data-sequence-name=${name}]`));
  }

  public findSequenceToolbar(name: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.findSequenceRowByName(name).get('.sequence-toolbar');
  }

  public findSequenceToolbarButtons(name: string): {view: Cypress.Chainable<JQuery<HTMLElement>>, delete: Cypress.Chainable<JQuery<HTMLElement>>} {
    const toolbar: Cypress.Chainable<JQuery<HTMLElement>> = this.findSequenceToolbar(name);
    return {
      view: toolbar.get('.view'),
      delete: toolbar.get('.delete')
    };
  }

  deleteAllSequences(): void {
    const trashButtons = this.sequenceList;
    deleteAllRecords(trashButtons);
  }

}
