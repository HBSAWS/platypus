var path = require('path');
var rootPath = path.normalize(__dirname + '/../'); // normalizes to base path

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; 

module.exports = {
    development: {
        rootPath: rootPath,
        database: 'mongodb://localhost/platypus-dev',
        port: process.env.PORT || 3000
    },
    production: {
        rootPath: rootPath,
        database: 'mongodb://rhnosqlstg1.hbs.edu:27017/platypus',
        port: process.env.PORT || 3000
    }
};