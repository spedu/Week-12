var http = require('http');
var fs = require('fs');

var file = fs.createReadStream('lipsum.txt');

var server = http.createServer(function(request, response){
  if(request.url === '/favicon.ico'){
    response.writeHead(200, {'Content-Type': 'image/x-icon'});
    response.end();
    return;
  }

  response.writeHead(200, {'Content-Type': 'text/html'});

  file.pipe(response).on("finish", function(){
    response.end();

    // logging...
    var date = (new Date()).toISOString();
    var output = date + " " + request.method + " " + request.url + " " + request.headers['user-agent'];
    console.log(output);


  });


});

server.listen("7000", function(){
  console.log("listening on 7000");
});
