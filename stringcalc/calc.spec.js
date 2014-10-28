var calc = require('./index.js');

describe('String Calculator', function() {

  it('returns empty string number', function() {
    var res = calc('');
    expect(res).toBe(0);
  });

  it('adds one number', function() {
    var res = calc('1');
    expect(res).toBe(1);
  });

  it('adds two numbers', function() {
    var res = calc('1,2');
    expect(res).toBe(3);
  });

  it('adds three numbers', function() {
    var res = calc('1,2,3');
    expect(res).toBe(6);
  });

  it('adds three numbers', function() {
    var res = calc('1,2,3,4,5,6,7,8,9');
    expect(res).toBe(45);
  });

  it('new lines are ok', function() {
    var res = calc("1\n2,3");
    expect(res).toBe(6);
  });

  it('new lines are ok', function() {
    var res = calc("1\n2\n3");
    expect(res).toBe(6);
  });

  it('new lines with commas are ok', function() {
    var res = calc("1\n2\n3,4,5\n6");
    expect(res).toBe(21);
  });

  describe('Support different delimiters', function() {

    it('change the delimiter as part of string calc', function() {
      var res = calc("//;\n1;2");
      expect(res).toBe(3);
    });

    it('change the delimiter to \'hello\' as part of string calc', function() {
      var res = calc("//hello\n1hello2hello3");
      expect(res).toBe(6);
    });

    it('change the delimiter to \'....\' as part of string calc', function() {
      var res = calc("//....\n1....2....3");
      expect(res).toBe(6);
    });

    it('change the delimiter to \'//[***](newline)1***2***3\' as part of string calc', function() {
      var res = calc("//[***]\n1***2***3");
      expect(res).toBe(6);
    });

  });

  describe('Handling negative numbers', function() {

    it('throws on one negative number', function() {
      expect(function() { calc("-1") }).toThrow(new Error('negatives not allowed -1'));
    });

    it('throws on multiple negative number', function() {
      expect(function() { calc("-1,-2") }).toThrow(new Error('negatives not allowed -1 -2'));
    });

  });


  describe('Big numbers', function() {

    it('Numbers bigger than 1000 should be ignored 2 arguments', function() {
      var res = calc("2,1001");
      expect(res).toBe(2);
    });

    it('Numbers bigger than 1000 should be ignored more than 2 args', function() {
      var res = calc("2,1001,123,10");
      expect(res).toBe(135);
    });

  });

  describe('Allow multiple delimiters', function() {

    it('multiple delimiters like //[delim1][delim2](newline)', function() {
      var res = calc("//[*][%]\n1*2%3");
      expect(res).toBe(6);
    });

    it('can handle multiple delimiters with length longer than one char', function() {
      var res = calc("//[//][%%][bb]\n1//2%%3bb2");
      expect(res).toBe(8);
    });

  });

});
