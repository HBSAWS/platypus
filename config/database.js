var mongoose = require('mongoose');

module.exports = function(envConfig){
  require('./models/Article');
  require('./models/Category');
  require('./models/Feedback');
  
  // Connect to database
  mongoose.Promise = global.Promise;
  mongoose.connect(envConfig.database, function(error){
    if(error) throw error;
    console.log('Connected to database.')
  });
};