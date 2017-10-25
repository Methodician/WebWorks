import { WebWorksPage } from './app.po';

describe('web-works App', () => {
  let page: WebWorksPage;

  beforeEach(() => {
    page = new WebWorksPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
