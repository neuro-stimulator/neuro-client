import { Page } from '../../page';
import { ValidatedFormFields } from '../../share';

export class SequencePage implements Page {

  navigateTo(): void {
    cy.visit('/sequences/new');
  }

  get sequenceEmptyHeader(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#sequence-data-not-found');
  }

  get fieldSequenceName(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#sequence-name');
  }

  get fieldSequenceSourceExperiment(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#sequence-source-experiment');
  }

  // findSequenceSourceExperiment(experimentName: string): Cypress.Chainable<JQuery<HTMLElement>> {
  //   return this.fieldSequenceSourceExperiment.select(experimentName);
  //   // return this.fieldSequenceSourceExperiment.element(by.cssContainingText('option', experimentName));
  // }

  get fieldSequenceSize(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#sequence-size');
  }

  get fieldTagInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#tag-input');
  }

  get sequenceSaveButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.fab-toggler');
  }

  get buttonGenerateSequence(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#generate-sequence');
  }

  get buttonShowOriginalSequence(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#show-original-sequence');
  }

  get buttonGoToExperimentLink(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#go-to-experiment-link');
  }

  getPageInputs(): ValidatedFormFields {
    return {
      ids: [
        'sequence-name',
        'sequence-source-experiment',
        'sequence-size',
        'tag-input',
      ],
      classes: [
      ]
    };
  }

  public fillExperimentName(name: string) {
    // Vložím text do inputu
    this.fieldSequenceName.type(name);
    // Kliknu na jiný element -> tím si vynutím asynchronní validaci názvu
    this.fieldSequenceSize.click();
  }
}
