var Transform = require('stream').Transform;
var markdown = require('markdown').markdown;

module.exports = function(){
  var parser = new Transform();
  parser._transform = function(data, encoding, done){
    this.push(markdown.toHTML(data.toString()));
    done();
  };

  return parser;
};
