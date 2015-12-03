var http = require('http');
var url = require('url');
var fs = require('fs');

var logger = require('./logger');
var newlineTransformer = require('./newlineTransformer');
var markdownTransformer = require('./markdownTransformer');
var limitTransformer = require('./limitTransformer');

var server = http.createServer(function(request, response) {
  var purl = url.parse(request.url, true);

  if(request.url === '/favicon.ico') {
    response.writeHead(200);
    response.end();
    return;
  } else if(purl.pathname === '/lipsum') {
    console.log(purl.query);

    var limit = purl.query.limit;

    response.writeHead(200, {'Content-Type': 'text/html'});

    var file = fs.createReadStream('lipsum.txt');
    
    file.pipe(limitTransformer(limit)).pipe(newlineTransformer()).pipe(response);

    file.on('finished', function() {
      response.end();
    });
  } else if(purl.pathname === '/markdown') {
    response.writeHead(200, {'Content-Type': 'text/html'});

    var file = fs.createReadStream('sample.md');
    
    file.pipe(markdownTransformer()).pipe(response);

    file.on('finished', function() {
      response.end();
    });
  } else if(purl.pathname === '/readme') {
    response.writeHead(200, {'Content-Type': 'text/html'});

    var file = fs.createReadStream('README.md');
    
    file.pipe(markdownTransformer()).pipe(response);

    file.on('finished', function() {
      response.end();
    });
  } else {
    response.writeHead(404);
    response.end("404 Not Found");
  }

  logger(request, response);
});

server.listen(7000, function() {
 console.log("Listening on port 7000");
});