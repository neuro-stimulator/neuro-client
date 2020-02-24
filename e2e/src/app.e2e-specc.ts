import { browser, logging } from 'protractor';

import { ApplicationPage } from './app.po';

describe('workspace-project App', () => {
  let page: ApplicationPage;

  beforeEach(() => {
    page = new ApplicationPage();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
