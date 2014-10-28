var slugify = require('../index.js');

describe('Slug', function() {

  it('converts a space separated word to a url safe', function() {
    var text = slugify('hello world');
    expect(text).toBe('hello-world');
  });

  it('converts UPPER CASED word to a url safe', function() {
    var text = slugify('HELLO');
    expect(text).toBe('hello');
  });

  it('converts !@#@!# word to a url safe', function() {
    var text = slugify('__');
    expect(text).toBe('__');
  });

  it('converts this,asdas,da,sd word to a url safe', function() {
    var text = slugify('this,asdas,da,sd');
    expect(text).toBe('this-asdas-da-sd');
  });

  it('converts kjsadkasd.sa.d.asd.s word to a url safe', function() {
    var text = slugify('kjsadkasd.sa.d.asd.s');
    expect(text).toBe('kjsadkasd-sa-d-asd-s');
  });

  it('converts  (hey, we word to a url safe', function() {
    var text = slugify(' (hey, we');
    expect(text).toBe('hey-we');
  });

  it('like http://api', function() {
    var text = slugify('like http://api');
    expect(text).toBe('like-http-api');
  });

  // TODO: does not yet handle non alpha numeric chars by converting to their origin char, for example : ç -> c
  xit('hello ç', function() {
    var text = slugify('hello ç');
    expect(text).toBe('hello-c');
  });

  it("(carriage-return)hello(newline)this is a test", function() {
    var text = slugify("\rhello\nthis is a test");
    expect(text).toBe('hello-this-is-a-test');
  });

  it("should not start with a dash", function() {
    var text = slugify("\rhello\nthis is a test");
    expect(text).toBe('hello-this-is-a-test');
  });

  it("Not really an answer to your question but validating url's is really a serious p.i.t.a", function() {
    var text = slugify("Not really an answer to your question but validating url's is really a serious p.i.t.a");
    expect(text).toBe('not-really-an-answer-to-your-question-but-validating-url-s-is-really-a-serious-p-i-t-a');
  });

});
