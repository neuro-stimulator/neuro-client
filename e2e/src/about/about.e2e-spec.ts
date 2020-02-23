import { browser, logging } from 'protractor';

import { AboutPage } from './about.po';

describe('About page test', () => {

  let page: AboutPage;

  beforeEach(async () => {
    page = new AboutPage();
    await browser.waitForAngularEnabled(false);
  });

  it('Should display main header', async () => {
    await page.navigateTo();

    const header = await page.getHeader();
    expect(header).toEqual('Diplomová práce');
  });

  it('Should display secondary header', async () => {
    await page.navigateTo();

    const header = await page.getAuthorHeader();
    expect(header).toEqual('Petr Štechmüller');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

});

