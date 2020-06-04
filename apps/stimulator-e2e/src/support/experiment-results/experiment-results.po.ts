
import { Page } from '../page';
import { deleteAllRecords } from '../share';

export class ExperimentResultsPage implements Page {

  navigateTo(): void {
    cy.visit('/results');
  }

  get experimentResultsEmptyHeader(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#experiment-results-not-found').first();
    // return element(by.id('experiment-results-not-found'));
  }

  public get experimentResultList(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.experiment-result-list').first();
    // return element(by.className('experiment-result-list'));
  }

  public findExperimentResultRowByName(name: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('li[data-experiment-result-name=${name}]').first();
    // return this.experimentResultList.element(by.css(`li[data-experiment-result-name=${name}]`));
  }

  public findExperimentResultToolbar(name: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.findExperimentResultRowByName(name).get('.experiment-result-toolbar').first();
    // return this.findExperimentResultRowByName(name).element(by.className('experiment-result-toolbar'));
  }

  public findExperimentResultToolbarButtons(name: string): {view: Cypress.Chainable<JQuery<HTMLElement>>, delete: Cypress.Chainable<JQuery<HTMLElement>>} {
    const toolbar: Cypress.Chainable<JQuery<HTMLElement>> = this.findExperimentResultToolbar(name);
    return {
      view: toolbar.get('.view'),
      delete: toolbar.get('.delete')
    };
  }

  async deleteAllExperimentResults(): Promise<any> {
    // const trashButtons = await this.experimentResultList.all(by.css('.fa-trash.delete'));
    // await deleteAllRecords(trashButtons);
  }
}
