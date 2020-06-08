import { Page } from '../../page';

export class ExperimentResultPage implements Page {

  navigateTo(params: string[]): void {
    cy.visit(`/results/${params[0]}`);
    // return browser.get(`/results/${params[0]}`) as Promise<any>;
  }

  get fieldExperimentResultName(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#experiment-result-name').first();
    // return element(by.id('experiment-result-name'));
  }

  get elementExperimentVisualisation(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.experiment-visualisation').first();
    // return element(by.className('experiment-visualisation'));
  }

  get elementExperimentOffsetEditor(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.experiment-offset-editor').first();
    // return element(by.className('experiment-offset-editor'));
  }

  get elementDownloadEdperimentResultData(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#download-experiment-result-data').first();
      // return element(by.id('download-experiment-result-data'));
  }
}
