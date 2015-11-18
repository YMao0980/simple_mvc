var config = {};
config.HTML_FILE = '../client/index.html'
config.DB_URL = 'mongodb://localhost:27017/test';

var mongodb = require('mongodb');
mongodbServer = new mongodb.Server("localhost", 27017, {  
    auto_reconnect: true,
    poolSize: 10
}),

config.db = new mongodb.Db("test", mongodbServer);
module.exports = config;