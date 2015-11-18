var controller = require("./controller"),
       config = require("./config"),
       fs = require('fs'),
       url = require('./url');

function route(pathname,request,response) {
  console.log("About to route a request for " + pathname);
  if (typeof url[pathname] === 'function') {
    if(pathname === '/upload' ){
      url[pathname](request,response);	
    }else{
      var data = ''; 	
      request.on('data', function (chunk) {
        data += chunk;
      });
      request.on('end', function () {
        url[pathname](data,response);
      });     	
    }		
  }else if (pathname === '/index.html') {
    fs.readFile(config.HTML_FILE, function (err, html) {
      if (err) {
        throw err; 
      }       
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(html);
      response.end();
    });	
  }else if (pathname.indexOf("/image/") > -1) {
     var image =   '../client'+pathname;	
     var img = fs.readFileSync(image);
     response.writeHead(200, {'Content-Type': 'image/jpg' });
     response.end(img);
  }else if (pathname.indexOf("/js/") > -1) {
     var file =   '../client'+pathname;	
     var js = fs.readFileSync(file);
     response.writeHead(200, {'Content-Type': 'text/javascript' });
     response.end(js);   
  }else if (pathname.indexOf("/css/") > -1) {
     var file =   '../client'+pathname;	
     var css = fs.readFileSync(file);
     response.writeHead(200, {'Content-Type': 'text/css' });
     response.end(css);
  }else if (pathname.indexOf("/files/") > -1) {
     var file =   '../server'+pathname;	
     var img = fs.readFileSync(file);
     response.writeHead(200, {'Content-Type': 'image/jpg' });
     response.end(img);       
  } else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;