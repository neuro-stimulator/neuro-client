
export interface ValidatedFormFields {
  ids?: string[];
  classes?: {
    name: string,
    count: number
  }[];
}

export function validateFormFields(formFields: ValidatedFormFields) {
  for (const input of formFields.ids) {
    // const inputElement = await element(by.id(input));
    // await browser.wait(protractor.ExpectedConditions.visibilityOf(inputElement), 5000);
    // expect(inputElement.isPresent()).toBe(true, `Element: ${input} nebyl nalezen!`);
  }

  for (const input of formFields.classes ?? []) {
    // const inputElements: ElementFinder[] = await element.all(by.className(input.name));
    // expect(inputElements.length).toBe(input.count, `Na stránce se nevyskytuje požadovaný počet elementů třídy: ${input.name}!`);
  }
}

/**
 * Univerzální funkce pro smazání záznamů
 *
 * @param trashButtonContainer Kontejner tlačítek pro smazání záznamů
 */
export function deleteAllRecords(trashButtonContainer: Cypress.Chainable<JQuery<HTMLElement>>) {
  trashButtonContainer.find('.fa-trash.delete').then(trashButtonsRaw => {
    trashButtonsRaw.each((index, trashButton) => {
      cy.wrap(trashButton).click().then(() => {
          const confirmButton = cy.contains('Potvrzuji');
          confirmButton.click();
      });
    });
  });
}
