var http = require('http');
var fs = require('fs');
var url = require('url');

var logger = require('./logger');
var newlineTransformer = require('./newlineTransformer');
var markdownTransformer = require('./markdownTransformer');
var limitTransformer = require('./limitTransformer');

var handleMarkdown = function(filename, response){
  response.writeHead(200, {'Content-Type': 'text/html'});
  var file = fs.createReadStream(filename);
  file.pipe(markdownTransformer()).pipe(response);
};

var handleRequest = function(request, response){

  var purl = url.parse(request.url, true);


  if(request.url === '/favicon.ico'){
    response.writeHead(200);
    response.end();
    return;
  } else if(purl.pathname === '/lipsum'){
    response.writeHead(200, {'Content-Type': 'text/html'});
    var file = fs.createReadStream('lipsum.txt');
    file.pipe(limitTransformer(purl.query.limit)).pipe(newlineTransformer()).pipe(response);

  } else if(request.url === '/markdown'){
    handleMarkdown('sample.md', response);

  } else if(request.url === '/readme'){
    handleMarkdown('README.md', response);

  } else {
    response.writeHead(404);
    response.end("404 Not Found");
  }


  logger(request, response);

};

var server = http.createServer(handleRequest);

server.listen(7000, function(){
  console.log("starting server on 7000");
});
