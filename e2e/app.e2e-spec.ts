import { HomeAidPage } from './app.po';

describe('home-aid App', () => {
  let page: HomeAidPage;

  beforeEach(() => {
    page = new HomeAidPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
