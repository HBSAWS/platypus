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
        res.locals.versions = ['0.1', '0.2', '0.3', '0.4', '0.5','0.6','0.7','0.8'];
        res.locals.current = "0.8";
        res.locals.ver_selected = (req.session.ver_selected && req.session.ver_selected !== '') ? req.session.ver_selected : res.locals.current;
        res.locals.browsers = [
            "Chrome", "Internet Explorer", "Firefox", "Opera", "Safari",
            "Safari Mobile", "Android Mobile", "Windows Mobile"
        ]
        res.locals.accessibility_levels = [
            "WCAG 2.0 Level A",
            "WCAG 2.0 Level AA",
            "WCAG 2.0 Level AAA",
        ];
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
                    
                    var category_ids = _.map(categories, '_id');

                    Article.find({
                        _category: { $in: category_ids},
                        version: (res.locals.ver_selected !== res.locals.current ) ? res.locals.ver_selected : res.locals.current
                    })
                    .populate('_category')
                    .sort('title')
                    .lean()
                    .exec(function(err, articles){
                        if(err) return next(err);           
                        

                        var groupedbyCategories = _(articles)
                        .sortBy('_category.order')
                        .groupBy('_category.title')
                        .map(function(value, key) { 
                            return {
                                category: key, 
                                articles: value
                            }
                        })
                        .value();

                        // res.status(200).json(groupedbyCategories);
                        callback(null, groupedbyCategories);
                        
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