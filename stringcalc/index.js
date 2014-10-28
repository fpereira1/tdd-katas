
module.exports = function(string) {

  // stores errors for negative numbers
  var errors = [];

  // caters for when string is empty/falsy result is always 0
  if(!string) {
    return 0;
  }

  // to change a delimiter, the beginning of the string will contain
  // a separate line that looks like this:
  // “//[delimiter]\n[numbers…]” for example “//;\n1;2”
  var delimeter = "\n";
  if(string.substring(0, 2)==='//') {

    var broken = string.split(delimeter);
    var start = broken[0].substring(2);

    delimeter = start.replace('[','').replace(']','');
    string = broken[1];

    // Allow multiple delimiters like this:  “//[delim1][delim2]\n”
    var multiple = start.split('[').join(',').split(']').join(',').split(',');

    if(multiple) {
      multiple.forEach(function(del) {
        if(del) {
          string = string.split(del).join(',');
        }
      })
    }

  }

  // Break it into pieces, sometimes using a custom delimiter
  var pieces = string.split(delimeter).join(',').split(',');

  // Calling Add with a negative number will throw an exception 
  pieces.forEach(function(i) {
    if(parseInt(i)<0){
      errors.push(i);
    }
  });

  // and the negative that was passed.if there are multiple
  // negatives, show all of them in the exception message
  if(errors.length) {
    throw new Error('negatives not allowed ' + errors.join(' '));
  }

  // caters for single number where result is itself
  if(pieces.length===1) {
    return parseInt(pieces[0]);
  }

  // caters for multiple numbers calculations
  return pieces.reduce(function(prev, cur) {
    var curInt = parseInt(cur);
    var prevInt = parseInt(prev);
    // Numbers bigger than 1000 should be ignored
    return curInt>1000 ? prevInt : prevInt + curInt;
  });
}

