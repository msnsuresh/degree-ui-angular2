import { QubeDemoPage } from './app.po';

describe('qube-demo App', () => {
  let page: QubeDemoPage;

  beforeEach(() => {
    page = new QubeDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
