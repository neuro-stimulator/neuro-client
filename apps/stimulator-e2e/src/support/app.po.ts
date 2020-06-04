import { Page } from './page';

export class ApplicationPage implements Page {

  // private readonly noToastCondition = protractor.ExpectedConditions.and(this._noToastConditionDefinition);

  navigateTo(): void {
    cy.visit('/');
  }

  get applicationHeader(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#page-header').first();
    // return element(by.id('page-header'));
  }

  get pageToolsButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#page-tools-button').first();
    // return element(by.id('page-tools-button'));
  }

  get toasterContainer(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#toast-container').first();
    // return element(by.id('toast-container'));
  }

  public waitForNoToastVisible() {
    // cy.get('#toast-container').find('.ngx-toastr').should('have.length', 0);
    // await browser.wait(this.noToastCondition);
  }

  public waitForPageChange(pageTitle: string) {
    this.applicationHeader.should('have.text', pageTitle);
    // await browser.wait(protractor.ExpectedConditions.textToBePresentInElement(this.applicationHeader, pageTitle), 5000,
    //   `Titulek: ${pageTitle} nebyl nalezen!`);
    this.waitForNoToastVisible();
  }

  private _noToastConditionDefinition() {
    // return await element(by.id('toast-container')).all(by.className('ngx-toastr')).count() === 0;
  }

}
