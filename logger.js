module.exports = function(request, response) {
  var date = (new Date()).toISOString();
  var method = request.method;
  var status = response.statusCode;
  var url = request.url;
  var userAgent = request.headers['user-agent']

  console.log(date + " " + status + " " + method + " " + url + "\n" + userAgent);
};