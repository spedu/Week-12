var Transform = require('stream').Transform;

module.exports = function(){
  var parser = new Transform();
  parser._transform = function(data, encoding, done){
    this.push(data.toString().replace(/\n/g, '<br>'));
    done();
  };

  return parser;
};
