var express     = require('express'),
    logger        = require('morgan'),
    handlebars    = require("express-handlebars"),
    path          = require('path'),
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

    app.use(express.static(path.join(envConfig.rootPath, 'test/e2e')));
    app.use(express.static(path.join(envConfig.rootPath, 'public')));

    app.use(function(req, res, next) {
        Category.find({})
        .lean()
        .exec(function(err, categories) {
              if(err) return next(err);

                async.map(categories, function(category, done) {
                    Article.find({_category: category._id})
			.lean()
			.sort('title')
			.exec(function(err, a){
				if(err) return next(err);
				category.articles = a;
				done(null, categories);  
		   });
            }, function(err, result) {
                if(err) return next(err);
                //res.status(200).json(result);  
                res.locals.nav = result[0];
                return next();
            })
        });
        
    });

  
};
