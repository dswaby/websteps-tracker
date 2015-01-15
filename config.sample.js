var config = {}

config.port = process.env.PORT || 8080;
config.dbName = 'myDB';
config.mongodbConnectionString = 'mongodb://localhost:27017/'+config.dbName; 
config.passportSecret = 'keyboard cat';

module.exports = config;