var querystring = require("querystring"),
       config = require("./config"),
       model = require("./model"),
       fs = require('fs'),
       formidable = require("formidable");

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

function upload(request,response) {
  console.log("Request handler 'upload' was called.");
  var form = new formidable.IncomingForm();
  form.parse(request, function(error, fields, files) {
    filename = 'files/'+files.upload.name;
    fs.renameSync(files.upload.path, filename);
     var result = {
    	data: filename, 
     };  
    result = JSON.stringify(result); 
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(result);
    response.end();
  });
}
function add(request,response) {
  console.log("Request handler 'add' was called.");
  request=querystring.parse(request);
  model.add(request,response,function() {
  	 var result = {
                status: 'success', 
               };
  	result = JSON.stringify(result); 
  	response.writeHead(200, {"Content-Type": "application/json"});
  	response.write(result);
  	response.end();  
  });
}
function list(request,response) {
  console.log("Request handler 'list' was called.");
  model.list(request,response,function(list) {
  	var result = {
    	   data: list, 
              };  
             result = JSON.stringify(result); 
             response.writeHead(200, {"Content-Type": "application/json"});
             response.write(result);
             response.end();   
  });  
}
function edit(request,response) {
  console.log("Request handler 'edit' was called.");
  request=querystring.parse(request);
  model.edit(request,response,function() {
  	 var result = {
                status: 'success', 
               };
  	result = JSON.stringify(result); 
  	response.writeHead(200, {"Content-Type": "application/json"});
  	response.write(result);
  	response.end(); 
  });   
}
function remove(request,response) {
  console.log("Request handler 'delete' was called.");
  request=querystring.parse(request);
  model.remove(request,response,function() {
     var result = {
         status: 'success', 
     };
     result = JSON.stringify(result); 
     response.writeHead(200, {"Content-Type": "application/json"});
     response.write(result);
     response.end(); 
  }); 
    
}
function info(request,response) {
  console.log("Request handler 'info' was called.");
  request=querystring.parse(request);
  model.info(request,response,function(list) {
  	var result = {
    	   data: list, 
              };  
             result = JSON.stringify(result); 
             response.writeHead(200, {"Content-Type": "application/json"});
             response.write(result);
             response.end();   
  });    
}
exports.start = start;
exports.upload = upload;
exports.add = add;
exports.list = list;
exports.edit = edit;
exports.remove = remove;
exports.info = info;