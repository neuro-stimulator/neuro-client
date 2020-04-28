import { browser, protractor } from 'protractor';

import { ApplicationPage } from '../../app.po';
import { validateFormFields } from '../../share';
import { SequencePage } from './sequence.po';

describe('Sequence editor page', () => {

  let app: ApplicationPage;
  let page: SequencePage;

  beforeEach(async () => {
    page = new SequencePage();
    app = new ApplicationPage();
    await browser.waitForAngularEnabled(false);
  });

  it('should contain save button', async () => {
    await browser.wait(protractor.ExpectedConditions.visibilityOf(page.sequenceSaveButton));
    await expect(await page.sequenceSaveButton.isDisplayed()).toBeTruthy();
  });

  it('should check inputs', async () => {
    // Přejdu do editoru sekvencí
    await page.navigateTo();
    // Nechám zvalidovat všechny zadané inputy
    await validateFormFields(page.getPageInputs());
  });

});
