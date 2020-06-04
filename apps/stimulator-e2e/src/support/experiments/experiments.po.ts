import { ExperimentType } from '@stechy1/diplomka-share';

import { Page } from '../page';
import { deleteAllRecords } from '../share';

export class ExperimentsPage implements Page {
  navigateTo(): void {
    cy.visit('/experiments');
  }

  get experimentsEmptyHeader(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#experiments-not-found').first();
  }

  get experimentNewButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.fab-toggler').first();
  }

  get experimentTypeList(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.fab-button-list').first();
  }

  get availableExperimentList(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.experiment-list').first();
  }

  get addonButtonExperimentsFinder(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#button-addon-experiments-finder').first();
  }

  get addonButtonExperimentsFilter(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#button-addon-experiments-filter').first();
  }

  public findExperimentRowByName(name: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(`li[data-experiment-name=${name}]`).first();
  }

  findExperimentToolbar(name: string): {run: Cypress.Chainable<JQuery<HTMLElement>>, edit: Cypress.Chainable<JQuery<HTMLElement>>, delete: Cypress.Chainable<JQuery<HTMLElement>>} {
    const toolbar: Cypress.Chainable<JQuery<HTMLElement>> = this.findExperimentRowByName(name).get('.experiment-toolbar');
    return {
      run: toolbar.get('.run'),
      edit: toolbar.get('.edit'),
      delete: toolbar.get('.delete')
    };
  }


  clickToNewExperiment(experimentType: ExperimentType) {
    // Zobrazení nabídky s tlačítky pro jednotlivé experimenty
    this.experimentNewButton.click();
    // Zvolení vybraného tlačítka
    this.experimentTypeList.contains(ExperimentType[experimentType]).click();
    // this.experimentTypeList.get(by.buttonText(ExperimentType[experimentType])).click();
  }

  deleteAllExperiments(): void {
    // const trashButtons = await this.availableExperimentList.all(by.css('.fa-trash.delete'));
    // const trashButtons = this.availableExperimentList.find('.fa-trash.delete');
    deleteAllRecords(this.availableExperimentList);
  }
}
