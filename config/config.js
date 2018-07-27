var express         = require('express'),
    middlewares     = require('./middlewares'),
    logger          = require('morgan'),
    handlebars      = require("express-handlebars"),
    path            = require('path'),
    flash           = require('connect-flash'),
    session         = require('express-session'),
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'),
    toastr          = require('express-toastr'),
    helpers         = require('handlebars-helpers')();
    
module.exports = function(app, envConfig){

    app.locals = {
        helpers : helpers,
        GOOGLE_MAPS_KEY : process.env.PLATYPUS_GOOGLE_MAPS_KEY
    }

    app.set('views', path.join(envConfig.rootPath, 'views'));
    app.engine('.hbs', handlebars({
        extname: '.hbs',
        defaultLayout: '', 
        helpers: {
            foo: function (block) { return block.fn(); } //example
        },
        layoutsDir: path.join(envConfig.rootPath,'views/layouts'),
        partialsDir: path.join(envConfig.rootPath, 'views/partials')
    }));
    app.set('view engine', '.hbs');
    app.use(logger('tiny'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    }));
    app.use(cookieParser());
    app.use(session({
        httpOnly: false,  // ajax too
        secret: process.env.PLATYPUS_SESSION_SECRET,  
        saveUninitialized: true,
        resave: true,
    }));
    app.use(flash());
    app.use(toastr());

    app.use(express.static(path.join(envConfig.rootPath, 'test/e2e')));
    app.use(express.static(path.join(envConfig.rootPath, 'public')));
    app.use(express.static(path.join(envConfig.rootPath, 'dist')));

    app.use(middlewares.getVersion);
    app.use(middlewares.getNav);
    // app.use(middlewares.debug);

};
