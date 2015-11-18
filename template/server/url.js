controller = require("./controller")
// Set your url for project
// @example
// 127.0.0.1:8888/start this url will call start function in your controller.js
var url = {};
url["/start"] = controller.start;
module.exports = url;