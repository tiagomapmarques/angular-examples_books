describe('App', () => {

  beforeEach( () => {
    browser.get('/');
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('Welcome to angular2-seed!');
  });

  describe('toolbar', () => {

    it('should exist', () => {
      expect(element(by.css('sd-app sd-toolbar')).isPresent()).toEqual(true);
    });

    it('should have a title', () => {
      expect(element(by.css('sd-app sd-toolbar h1')).getText()).toEqual('Angular2 Examples: Book List');
    });
  });
});
