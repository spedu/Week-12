var Transform = require('stream').Transform;

module.exports = function() {
  var parse = new Transform();
  parse._transform = function(data, encoding, done) { // data == chunk
    this.push(data.toString().replace(/\n/g, '<br>'));
    done();
  };

  return parse;
};