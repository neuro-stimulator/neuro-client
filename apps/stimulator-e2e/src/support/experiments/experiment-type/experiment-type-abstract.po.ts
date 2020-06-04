import { Page } from '../../page';

export abstract class ExperimentTypeAbstractPage implements Page {

  public abstract navigateTo(): void;

  public abstract getPageInputs(): {ids?: string[], classes?: {name: string, count: number}[]};

  get experimentSaveButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.fab-toggler').first();
  }

  get fieldExperimentName(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#experiment-name').first();
  }

  get fieldExperimentDescription(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#experiment-description').first();
  }

  get fieldExperimentTagInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#tag-input').first();
  }

  get fieldsExperimentTagBadges(): any {
    return cy.get('.tags').first().find('.tag-badge');
    // return element(by.className('tags')).all(by.className('tag-badge'));
  }

  get validationHeaderNameExists(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#validation-header-name-exists').first();
    // return element(by.id('validation-header-name-exists'));
  }

  get commonExperimentInputs(): string[] {
    return [
      'experiment-description',
      'experiment-name',
      'tag-input',
    ];
  }

  public fillExperimentName(name: string) {
    // Vložím text do inputu
    this.fieldExperimentName.type(name);
    // Kliknu na jiný element -> tím si vynutím asynchronní validaci názvu
    this.fieldExperimentDescription.click();
  }

  public fillExperimentDescription(description: string) {
    this.fieldExperimentDescription.type(description);
  }

  public validationHeaderNameExistsIsNotVisible() {
    // cy.isNotInViewport('#validation-header-name-exists');
  }

  public changeFieldValues() {
  }

  public afterExperimentCreated() {
  }

}
