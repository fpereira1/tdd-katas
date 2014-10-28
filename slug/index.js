module.exports = function(text) {
  var txt = text;

  // Set the text to lowercase
  txt = txt.toLowerCase();

  // replaces everything that is not alpha to a dash
  txt = txt.replace(/[^a-zA-Z0-9_-]/g, '-');

  // remove duplicated dashes when they appear
  while(txt.indexOf('--')>-1) {
    txt = txt.replace(/--/, '-')
  }

  // ensures that slugified url doesn't start with a dash 
  txt = txt.charAt(0)==='-' ? txt.substring(1) : txt;

  return txt;
}
