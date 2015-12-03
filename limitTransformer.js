var Transform = require('stream').Transform;

module.exports = function(limit) {
  var parse = new Transform();
  parse._transform = function(data, encoding, done) { // data == chunk
    if(limit === undefined) {
      this.push(data);
      done();
    } else {
      if(limit > data.toString().length) {
        this.push(data);
        limit - data.toString().length;
      } else if(limit > 0 && limit < data.toString().length) {
        this.push(data.toString().substr(0, limit));
        limit = 0;
      }
      done();
    }
  };

  return parse;
};