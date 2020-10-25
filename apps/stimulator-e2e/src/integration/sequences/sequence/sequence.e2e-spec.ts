import { ApplicationPage } from '../../../support/app.po';
import { SequencePage } from '../../../support/sequences/sequence/sequence.po';
import { validateFormFields } from '../../../support/share';

describe('Sequence editor page', () => {

  let app: ApplicationPage;
  let page: SequencePage;

  beforeEach(async () => {
    page = new SequencePage();
    app = new ApplicationPage();
  });

  it('should contain save button', async () => {
    page.sequenceSaveButton.should('be.visible');
    // await browser.wait(protractor.ExpectedConditions.visibilityOf(page.sequenceSaveButton));
    // await expect(await page.sequenceSaveButton.isDisplayed()).toBeTruthy();
  });

  it('should check inputs', async () => {
    // Přejdu do editoru sekvencí
    await page.navigateTo();
    // Nechám zvalidovat všechny zadané inputy
    await validateFormFields(page.getPageInputs());
  });

});
