var fs = require('fs');

var file = fs.createReadStream('lipsum.txt');

/*
file.on('readable', function() {
  var chunk = null;
  while((chunk = file.read()) !== null) {
    process.stdout.write(chunk.toString());
  }
});
*/

file.pipe(process.stdout);

file.on('end', function() {
  console.log('File End');
});