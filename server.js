var http = require('http');
var fs = require('fs');
var Transform = require('stream').Transform;
var url = require('url');
var markdown = require('markdown').markdown;

var addBrsParser = function(data, encoding, done){
  this.push(data.toString().replace(/\n/g, '<br>'));
  done();
};

var markdownParser = function(data, encoding, done){
  this.push(markdown.toHTML(data.toString()));
  done();
};

var logger = function(request, response){
  var date = (new Date()).toISOString();
  var output = date + " " + request.method + " " + response.statusCode + " " + request.url + " " + request.headers['user-agent'];
  console.log(output);
};

var handleRequest = function(request, response){

  response.on("error", function(e){
    console.log(e);
    response.writeHead(500, {'Content-Type': 'image/x-icon'});
    response.end("500 Internal Server Error");
  });

  if(request.url === '/favicon.ico'){
    response.writeHead(200, {'Content-Type': 'image/x-icon'});
    response.end();
    return;
  }

  if(request.url === '/lipsum'){
    var file = fs.createReadStream('lipsum.txt');
    var parser = new Transform();
    parser._transform = addBrsParser;

    response.writeHead(200, {'Content-Type': 'text/html'});
    file.pipe(parser).pipe(response).on("finish", function(){
      response.end();

      logger(request, response);
      });

  } else if(request.url === '/sample'){
    var file = fs.createReadStream('sample.md');
    var parser = new Transform();
    parser._transform = markdownParser;

    response.writeHead(200, {'Content-Type': 'text/html'});
    file.pipe(parser).pipe(response).on("finish", function(){
      response.end();

      logger(request, response);
      });

  } else {

    response.writeHead(404);
    response.end("404 Not Found");

    logger(request, response);

  }

};

var server = http.createServer(handleRequest);

server.listen("7000", function(){
  console.log("listening on 7000");
});
