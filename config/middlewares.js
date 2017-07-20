// Navigation
require('../models/Category');
require('../models/Article');
var mongoose = require('mongoose'),
    Category = mongoose.model('Category'),
    Article = mongoose.model('Article'),
    async = require('async'),
    _ = require('lodash');

module.exports = {
	getVersion: function(req, res, next) {
		console.log("Determining article version to show");
        res.locals.versions = ['0.1', '0.2', '0.3'];
        res.locals.current = "0.3";
        res.locals.ver_selected = (req.session.ver_selected && req.session.ver_selected !== '') ? req.session.ver_selected : res.locals.current;
        res.locals.browsers = [
            "Chrome", "Internet Explorer", "Firefox", "Opera", "Safari",
            "Safari Mobile", "Android Mobile", "Windows Mobile"
        ]
		return next();
	},
	getNav: function(req, res, next) {
    
        
            async.waterfall([
                function(callback) {

                    Category.find({})
                    .populate('_parent')
                    .sort('order')
                    .lean()
                    .exec(function(err, categories) {
                        if(err) return next(err);
                        callback(null, categories);
                    });

                },
                function(categories, callback) {
                    
                    _.map(categories, function(category, i) {
                        console.log(i);
                        Article.find({
                            _category: category._id,
                            version: (res.locals.ver_selected !== res.locals.current ) ? res.locals.ver_selected : res.locals.current
                        })
                        .sort('title')
                        .lean()
                        .exec(function(err, a){
                            if(err) return next(err);           
                            category.articles = a;
                            if(categories.length === i+1) {
                                callback(null, categories);
                            }
                        });
                    });                
                }
            ], function (err, categories) {
                if (err) {
                    console.log(err);
                    return next(err);
                } else {
                    console.log("Navigation is ready");
                    res.app.locals.nav = categories;
                    return next();
                }
            });
        

	},
	debug: function(req, res, next) {
	    console.log(req.session);
	    mongoose.set('debug', true);
        return next();
	},
	last: {}
}