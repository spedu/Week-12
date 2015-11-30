var fs = require('fs');

var file = fs.createReadStream('lipsum.txt');

/*
file.on('readable', function(){
  var chunk = null;
  while(null !== (chunk = file.read())){
    //console.log(chunk.toString());
    process.stdout.write(chunk.toString());
  }
});
*/

file.pipe(process.stdout);


file.on('end', function(){
  console.log("we done now");
});
