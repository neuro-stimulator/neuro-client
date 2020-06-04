import { Page } from '../page';

export class PlayerPage implements Page {

  navigateTo(params: string[]): void {
    cy.visit(`/player/${params[0]}/${params[1]}`);
    // return browser.get(`/player/${params[0]}/${params[1]}`) as Promise<any>;
  }

  findPlayerToolbar(): {
    upload: Cypress.Chainable<JQuery<HTMLElement>>,
    run: Cypress.Chainable<JQuery<HTMLElement>>,
    pause: Cypress.Chainable<JQuery<HTMLElement>>,
    finish: Cypress.Chainable<JQuery<HTMLElement>>,
    clear: Cypress.Chainable<JQuery<HTMLElement>>
  } {
    const toolbar = cy.get(".control-panel-toolbar");
    return {
      upload: toolbar.get(".upload"),
      run: toolbar.get(".run"),
      pause: toolbar.get(".pause"),
      finish: toolbar.get(".finish"),
      clear: toolbar.get(".clear")
    };
  }

}
