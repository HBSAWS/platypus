var path = require('path');
var rootPath = path.normalize(__dirname + '/../'); // normalizes to base path

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; 

module.exports = {
    development: {
        rootPath: rootPath,
        // database: 'mongodb://robsilva:1Temporary2@ds111559.mlab.com:11559/platypus',
        database: 'mongodb://localhost/hbs-aws-framework-dev',
        port: process.env.PORT || 3000
    },
    production: {
        rootPath: rootPath,
        database: 'mongodb://localhost/platypus-prod',
        port: process.env.PORT || 80
    }
};