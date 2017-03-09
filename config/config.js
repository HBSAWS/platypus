var express     = require('express'),
    logger        = require('morgan'),
    handlebars    = require("express-handlebars"),
    path          = require('path'),
    session       = require('express-session'),
    cookieParser  = require('cookie-parser'),
    bodyParser    = require('body-parser'),
    async         = require('async');

// Navigation
require('./models/Category');
require('./models/Article');
var mongoose = require('mongoose'),
    Category = mongoose.model('Category');
    Article = mongoose.model('Article');
  
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
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    }));
    app.use(cookieParser());
    app.use(session({
        httpOnly: false,  // ajax too
        secret: '1Temporary2',  // TODO: store in env var
        resave: false,
        saveUninitialized: true,
    }));

    app.use(express.static(path.join(envConfig.rootPath, 'test/e2e')));
    app.use(express.static(path.join(envConfig.rootPath, 'public')));

    app.use(function(req, res, next) {

        console.log("********************************* Le Globals *********************************");
        res.locals.versions = ['0.1', '0.2'];
        res.locals.current = "0.1";
        res.locals.ver_selected = (req.session.ver_selected && req.session.ver_selected !== '') ? req.session.ver_selected : res.locals.current;

        console.log("res.locals.versions: " + res.locals.versions);
        console.log("res.locals.current: " + res.locals.current);
        console.log("res.locals.ver_selected: " + res.locals.ver_selected);

        // Get nav items
        Category.find({})
        .lean()
        .exec(function(err, categories) {
              if(err) return next(err);

                async.map(categories, function(category, done) {
                    Article.find(
                        {
                            _category: category._id,
                            version: res.locals.current
                        }
                    )
			.lean()
			.sort('title')
			.exec(function(err, a){
				if(err) return next(err);
				category.articles = a;
				done(null, categories);  
		   });
            }, function(err, result) {
                if(err) return next(err); 
                res.locals.nav = result[0];
                return next();
            })
        });
       
    });

    // Debug session
    app.use(function(req, res, next) {
        console.log(req.session);
        return next();
    });

  
};
