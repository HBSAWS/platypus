var express     = require('express');
  logger        = require('morgan');
  handlebars    = require("express-handlebars");
  path          = require('path');
  bodyParser    = require('body-parser');
  
module.exports = function(app, envConfig){

  // view engine setup
  app.set('views', path.join(envConfig.rootPath, 'views'));
  app.engine('.hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'main', 
    layoutsDir: path.join(envConfig.rootPath,'views/layouts'),
    partialsDir: path.join(envConfig.rootPath, 'views/partials')
  }));
  app.set('view engine', '.hbs');

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use(express.static(path.join(envConfig.rootPath, 'public')));


  app.use(function(req, res, next) {
    console.log("************************ Setting app.local vars ************************");
    res.locals.themes = ['BlueGrey', 'Teal', 'Red', 'Pink', 'Purple', 'DeepPurple', 'Indigo', 'Blue', 'Lightblue', 'Cyan', 'Green', 'LightGreen', 'Lime', 'Yellow', 'Amber', 'Orange', 'DeepOrange', 'Brown', 'Grey'];
    return next();
  });

  
};