describe('Home', () => {

  beforeEach( () => {
    browser.get('/');
  });

  it('should have an input', () => {
    expect(element(by.css('sd-home .text-input')).isPresent()).toEqual(true);
  });

  it('should filter the books list by title', () => {
    element(by.css('sd-home .text-input')).sendKeys('Ring');
    // element(by.css('sd-home form button')).click();
    expect(element.all(by.css('sd-book-summary')).count()).toEqual(2);
  });

  it('should filter the books list by author', () => {
    element(by.css('sd-home .text-input')).sendKeys('Tolkein');
    expect(element.all(by.css('sd-book-summary')).count()).toEqual(1);
  });

  it('should display an error message when no books are found after filtering', () => {
    element(by.css('sd-home .text-input')).sendKeys('Tolkien');
    expect(element.all(by.css('sd-book-summary')).count()).toEqual(0);
    expect(element(by.css('sd-home .error')).getText()).toEqual('Oops! No books match such criteria.');
  });
});
