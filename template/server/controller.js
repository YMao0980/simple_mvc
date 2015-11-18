function start(request,response) {
  console.log("Request handler 'start' was called.");
    var test = {
     status:'success',
    };
    var json = JSON.stringify(test);
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(json);
    response.end();
}
exports.start = start;