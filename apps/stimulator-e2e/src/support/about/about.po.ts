import { Page } from "../page";

export class AboutPage implements Page {

  navigateTo() {
    cy.visit('/about');
  }

  getHeader() {
    return cy.get('#header-master-thesis').first()
  }

  getAuthorHeader() {
    return cy.get('#header-author').first();
  }
}
