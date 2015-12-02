module.exports = function(request, response){
  var date = (new Date()).toString();
  console.log(date + " " + response.statusCode + " " + request.method + " " + request.url + " " + request.headers['user-agent']);
};
