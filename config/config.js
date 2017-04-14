var express         = require('express'),
    middlewares     = require('./middlewares'),
    logger          = require('morgan'),
    handlebars      = require("express-handlebars"),
    path            = require('path'),
    flash           = require('connect-flash'),
    session         = require('express-session'),
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'),
    toastr          = require('express-toastr');
    
module.exports = function(app, envConfig){

    // view engine setup
    app.set('views', path.join(envConfig.rootPath, 'views'));
    app.engine('.hbs', handlebars({
        extname: '.hbs',
        defaultLayout: '', 
        layoutsDir: path.join(envConfig.rootPath,'views/layouts'),
        partialsDir: path.join(envConfig.rootPath, 'views/partials')
    }));
    app.set('view engine', '.hbs');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    }));
    app.use(cookieParser());
    app.use(session({
        httpOnly: false,  // ajax too
        secret: '1Temporary2',  // TODO: store in env var
        saveUninitialized: true,
        resave: true,
    }));
    app.use(flash());
    app.use(toastr());

    app.use(express.static(path.join(envConfig.rootPath, 'test/e2e')));
    app.use(express.static(path.join(envConfig.rootPath, 'public')));
    app.use(express.static(path.join(envConfig.rootPath, 'dist')));

    app.use(middlewares.setGlobals);
    app.use(middlewares.getNav);
    // app.use(middlewares.debug);

        
  
};
