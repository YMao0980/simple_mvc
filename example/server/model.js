var querystring = require("querystring"),
       config = require("./config"),
       ObjectID = require('mongodb').ObjectID;
function add(request,response,callback) {
  config.db.open(function() {
     config.db.collection("note", function(error, collection) {
         collection.insert({
             name:request.name,	
             message: request.message,
             create:new Date(),
          },function(err){
            config.db.close();
            (callback && typeof(callback) === "function") && callback();
          });
      });
  });  
}
function list(request,response,callback) {
  var list = '';
  config.db.open(function() {
     config.db.collection("note", function(error, collection) {
          collection.find({},{'sort':'create'}).toArray(function(err, list) {        
            config.db.close();
            (callback && typeof(callback) === "function") && callback(list);
        })
      });
  }); 
}
function edit(request,response,callback) {
  id = new ObjectID(request.id);
  config.db.open(function() {
     config.db.collection("note", function(error, collection) {
         collection.update(
           { _id: id },
           {
            $set:{
              name:request.name,
              message:request.message
             }
           },function(err){
              config.db.close();
              (callback && typeof(callback) === "function") && callback();
           });
      });
  });   
}
function remove(request,response,callback) {
  id = new ObjectID(request.id);
  config.db.open(function() {
     config.db.collection("note", function(error, collection) {
          collection.remove({'_id': id},function(err) {            
            config.db.close();
            (callback && typeof(callback) === "function") && callback();
        })
      });
  });    
}
function info(request,response,callback) {
  id = new ObjectID(request.id);
  var list = '';
  config.db.open(function() {
     config.db.collection("note", function(error, collection) {
          collection.find({'_id': id}).toArray(function(err, list) {            
            config.db.close();
            (callback && typeof(callback) === "function") && callback(list);
        })
      });
  });      
}
exports.add = add;
exports.list = list;
exports.edit = edit;
exports.remove = remove;
exports.info = info;