import { browser, by, element, ElementFinder, protractor } from 'protractor';

export interface ValidatedFormFields {
  ids?: string[];
  classes?: {
    name: string,
    count: number
  }[];
}

export async function validateFormFields(formFields: ValidatedFormFields) {
  for (const input of formFields.ids) {
    const inputElement = await element(by.id(input));
    await browser.wait(protractor.ExpectedConditions.visibilityOf(inputElement), 5000);
    expect(inputElement.isPresent()).toBe(true, `Element: ${input} nebyl nalezen!`);
  }

  for (const input of formFields.classes ?? []) {
    const inputElements: ElementFinder[] = await element.all(by.className(input.name));
    expect(inputElements.length).toBe(input.count, `Na stránce se nevyskytuje požadovaný počet elementů třídy: ${input.name}!`);
  }
}

/**
 * Univerzální funkce pro smazání záznamů z experimentů, jejich výsledků a sekvencí
 *
 * @param trashButtons Pole tlačítek na smazání
 */
export async function deleteAllRecords(trashButtons: ElementFinder[]): Promise<any> {
    for (const trashButton of trashButtons) {
    await trashButton.click();
    const confirmButton = element(by.buttonText('Potvrzuji'));
    await browser.wait(protractor.ExpectedConditions.visibilityOf(confirmButton), 5000);
    await confirmButton.click();
  }
}
