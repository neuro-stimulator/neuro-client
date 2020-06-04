import { AboutPage } from "../../support/about/about.po";

describe('About page test', () => {

  let page: AboutPage;

  beforeEach(() => {
    page = new AboutPage();
  });

  it('Should display main header', () => {
    page.navigateTo();

    const header = page.getHeader();
    header.should('have.text', 'Diplomová práce');
  });

  it('Should display secondary header', () => {
    page.navigateTo();

    const header = page.getAuthorHeader();
    header.should('have.text', 'Petr Štechmüller');
  });

});
