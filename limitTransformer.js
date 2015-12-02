var Transform = require('stream').Transform;

module.exports = function(limit){

  var parser = new Transform();
  parser._transform = function(data, encoding, done){
    if(data.toString().length < limit){
      this.push(data);
      limit = limit - data.toString().length;
    } else {
      this.push(data.toString().substr(0, limit));
      limit = 0;
    }
    done();
  };

  return parser;
};
