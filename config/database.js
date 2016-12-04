var mongoose = require('mongoose');

module.exports = function(envConfig){
  require('./models/Article');
  require('./models/Category');
  
  // Connect to database
  mongoose.connect(envConfig.database, function(error){
    if(error) throw error;
    console.log('Connected to database.')
  });
};