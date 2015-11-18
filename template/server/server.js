var http = require("http");
var url = require("url");
var router = require("./router");
// This is server . You can change port here.
http.createServer(function(request, response) {
  var pathname = url.parse(request.url).pathname;
  router.route(pathname,request,response);
}).listen(8888);